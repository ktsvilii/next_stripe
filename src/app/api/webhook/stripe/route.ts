import prisma from '@/db/prisma';
import { stripe } from '@/lib/stripe';
import { EVENT_TYPES, PLAN, PLAN_FREQUENCY_UPDATE } from '@/lib/types';

import Stripe from 'stripe';

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();

  const sig = req.headers.get('stripe-signature')!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case EVENT_TYPES.CHECKOUT_SESSION_COMPLETED:
        const session = await stripe.checkout.sessions.retrieve((event.data.object as Stripe.Checkout.Session).id, {
          expand: ['line_items'],
        });
        const customerId = session.customer as string;
        const customerDetails = session.customer_details;

        if (customerDetails?.email) {
          const user = await prisma.user.findUnique({ where: { email: customerDetails.email } });
          if (!user) throw new Error('User not found');

          if (!user.customerId) {
            await prisma.user.update({
              where: { id: user.id },
              data: { customerId },
            });
          }

          const lineItems = session.line_items?.data || [];

          for (const item of lineItems) {
            const priceId = item.price?.id;
            const isSubscription = item.price?.type === 'recurring';

            if (isSubscription) {
              let endDate = new Date();
              if (priceId === process.env.STRIPE_YEARLY_PRICE_ID!) {
                endDate.setFullYear(endDate.getFullYear() + 1); // 1 year from now
              } else if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID!) {
                endDate.setMonth(endDate.getMonth() + 1); // 1 month from now
              } else {
                throw new Error('Invalid priceId');
              }
              // it is gonna create the subscription if it does not exist already, but if it exists it will update it
              await prisma.subscription.upsert({
                where: { userId: user.id! },
                create: {
                  userId: user.id,
                  startDate: new Date(),
                  endDate: endDate,
                  plan: PLAN.PREMIUM,
                  period:
                    priceId === process.env.STRIPE_YEARLY_PRICE_ID!
                      ? PLAN_FREQUENCY_UPDATE.YEARLY
                      : PLAN_FREQUENCY_UPDATE.MONTHLY,
                },
                update: {
                  plan: PLAN.PREMIUM,
                  period:
                    priceId === process.env.STRIPE_YEARLY_PRICE_ID!
                      ? PLAN_FREQUENCY_UPDATE.YEARLY
                      : PLAN_FREQUENCY_UPDATE.MONTHLY,
                  startDate: new Date(),
                  endDate: endDate,
                },
              });

              await prisma.user.update({
                where: { id: user.id },
                data: { plan: PLAN.PREMIUM },
              });
            } else {
              // one_time_purchase
            }
          }
        }
        break;

      case EVENT_TYPES.CHECKOUT_SUBSCRIPTION_DELETED: {
        const subscription = await stripe.subscriptions.retrieve((event.data.object as Stripe.Subscription).id);
        const user = await prisma.user.findUnique({
          where: { customerId: subscription.customer as string },
        });
        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { plan: PLAN.FREE },
          });
          await prisma.subscription.update({
            where: { userId: user.id },
            data: { earlyTerminated: true, isActive: false, terminatedAt: new Date(), updatedAt: new Date() },
          });
        } else {
          console.error('User not found for the subscription deleted event.');
          throw new Error('User not found for the subscription deleted event.');
        }

        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error('Error handling event', error);
    return new Response('Webhook Error', { status: 400 });
  }

  return new Response('Webhook received', { status: 200 });
}
