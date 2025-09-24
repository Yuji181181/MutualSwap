import { prisma } from "@/lib/prisma";

export const getMypageData = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      grade: true,
      image: true,
      totalEarnedPoints: true,
      currentPoints: true,
    },
  });

  if (!user) {
    return null;
  }

  const surveys = await prisma.survey.findMany({
    where: {
      userId,
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      googleFormUrl: true,
      questionCount: true,
      deadline: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return {
    user,
    surveys,
  };
};
