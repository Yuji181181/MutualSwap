import { prisma } from "@/lib/prisma";

export const getMypageSurveys = async (userId: string) => {
  const surveys = await prisma.survey.findMany({
    where: {
      userId: userId,
    },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          grade: true,
          image: true,
        },
      },
    },
  });
  return surveys;
};

export const getMypageData = async (userId: string) => {
  const [surveys, user] = await Promise.all([
    getMypageSurveys(userId),
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        grade: true,
        image: true,
        currentPoints: true,
        totalEarnedPoints: true,
        createdAt: true,
      },
    }),
  ]);

  return { surveys, user };
};
