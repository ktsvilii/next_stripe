'use server';
import prisma from '@/db/prisma';
import { PLAN } from '@/lib/types';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function checkIsPremiumUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return { success: false };
  }

  const existingUser = await prisma.user.findUnique({ where: { id: user.id } });

  if (!existingUser) {
    return { success: false };
  }

  return { success: true, isPremiumUser: existingUser.plan === PLAN.PREMIUM };
}
export default checkIsPremiumUser;
