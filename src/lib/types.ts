export interface RouteProps {
  href: string;
  label: string;
}

export enum PopularPlanType {
  NO = 'NO',
  YES = 'YES',
}

export interface PricingProps {
  title: PLAN;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
  href: string;
  paymentLink?: string;
  billing: string;
}

export const enum PLAN {
  FREE = 'free',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}

export const enum PLAN_FREQUENCY_UPDATE {
  YEARLY = 'yearly',
  MONTHLY = 'monthly',
}

export const enum EVENT_TYPES {
  CHECKOUT_SESSION_COMPLETED = 'checkout.session.completed',
  CHECKOUT_SUBSCRIPTION_DELETED = 'customer.subscription.deleted',
}
