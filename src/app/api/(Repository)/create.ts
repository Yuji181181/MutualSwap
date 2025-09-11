import { prisma } from "@/lib/prisma";

export const createSurvey = async (
  userId: string,
  data: {
    title: string;
    description?: string;
    googleFormUrl: string;
    questionCount: number;
    deadline?: Date;
  },
) => {
  const survey = await prisma.survey.create({
    data: {
      ...data,
      userId,
      isActive: true,
    },
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
  return survey;
};
