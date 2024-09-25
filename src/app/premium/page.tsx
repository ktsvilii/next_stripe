'use client';

import { FC } from 'react';
import { redirect } from 'next/navigation';
import checkIsPremiumUser from './actions';
import { useQuery } from '@tanstack/react-query';

const Page: FC = () => {
  const { data } = useQuery({
    queryKey: ['checkIsPremiumUser'],
    queryFn: async () => checkIsPremiumUser(),
  });

  if (!data?.isPremiumUser) return redirect('/');

  return <div className='max-w-7xl mx-auto'>You are on the premium plan so you can see this page</div>;
};
export default Page;
