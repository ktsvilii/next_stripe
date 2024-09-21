export enum PopularPlanType {
  NO = 'NO',
  YES = 'YES',
}

export interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
  href: string;
  paymentLink?: string;
  billing: string;
}

export const pricingList: PricingProps[] = [
  {
    title: 'Free',
    popular: PopularPlanType.NO,
    price: 0,
    description: 'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
    buttonText: 'Get Started',
    benefitList: ['1 Team member', '2 GB Storage', 'Upto 4 pages', 'Community support', 'lorem ipsum dolor'],
    href: '/api/auth/login',
    billing: '/month',
  },
  {
    title: 'Premium',
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
    title: 'Enterprise',
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
