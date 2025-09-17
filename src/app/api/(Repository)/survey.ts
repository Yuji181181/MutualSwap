import { prisma } from "@/lib/prisma";

export const getSurveys = async () => {
  const surveys = await prisma.survey.findMany({
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

export const getSurveyById = async (id: string) => {
  const survey = await prisma.survey.findUnique({
    where: { id },
  });
  return survey;
};
