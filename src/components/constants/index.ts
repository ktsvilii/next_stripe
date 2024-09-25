import { PLAN, PopularPlanType, PricingProps } from '@/lib/types';

export const pricingList: PricingProps[] = [
  {
    title: PLAN.FREE,
    popular: PopularPlanType.NO,
    price: 0,
    description: 'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
    buttonText: 'Get Started',
    benefitList: ['1 Team member', '2 GB Storage', 'Upto 4 pages', 'Community support', 'lorem ipsum dolor'],
    href: '/api/auth/login',
    billing: '/month',
  },
  {
    title: PLAN.PREMIUM,
    popular: PopularPlanType.YES,
    price: 9.99,
    description: 'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
    buttonText: 'Buy Now',
    benefitList: ['4 Team member', '4 GB Storage', 'Upto 6 pages', 'Priority support', 'lorem ipsum dolor'],
    href: '/api/auth/login',
    paymentLink: process.env.STRIPE_MONTHLY_PLAN_URL,
    billing: '/month',
  },
  {
    title: PLAN.ENTERPRISE,
    popular: PopularPlanType.NO,
    price: 99.99,
    description: 'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
    buttonText: 'Buy Now',
    benefitList: ['10 Team member', '8 GB Storage', 'Upto 10 pages', 'Priority support', 'lorem ipsum dolor'],
    href: '/api/auth/login',
    paymentLink: process.env.STRIPE_YEARLY_PLAN_URL,
    billing: '/year',
  },
];
