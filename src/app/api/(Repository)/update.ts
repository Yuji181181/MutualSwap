import { prisma } from "@/lib/prisma";

export const updateSurvey = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    googleFormUrl?: string;
    questionCount?: number;
    deadline?: Date;
    isActive?: boolean;
  },
) => {
  const updatedSurvey = await prisma.survey.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
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
  return updatedSurvey;
};
