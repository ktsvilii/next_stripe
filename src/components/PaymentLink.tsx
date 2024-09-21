'use client';

import React from 'react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

interface PaymentLinkProps {
  href: string;
  text: string;
  paymentLink?: string;
}

const PaymentLink = ({ href, text, paymentLink }: PaymentLinkProps) => {
  const handleLinkClick = () => {
    if (paymentLink) {
      localStorage.setItem('paymentLink', paymentLink);
    }
  };

  return (
    <Link href={href} className={buttonVariants()} onClick={handleLinkClick}>
      {text}
    </Link>
  );
};

export default PaymentLink;
