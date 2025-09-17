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
