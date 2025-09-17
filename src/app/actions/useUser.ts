"use server";

import { prisma } from "@/lib/prisma";

export async function useUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      grade: true,
      image: true,
      currentPoints: true,
      totalEarnedPoints: true,
    },
  });

  return user;
}
