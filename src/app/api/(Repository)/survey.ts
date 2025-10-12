import { prisma } from "@/lib/prisma";

export const getSurveys = async (currentUserId?: string) => {
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
      surveyResponses: currentUserId
        ? {
            where: { userId: currentUserId },
            select: { id: true },
          }
        : false,
    },
  });

  // hasAnsweredフィールドを追加
  return surveys.map((survey) => ({
    ...survey,
    hasAnswered: currentUserId ? survey.surveyResponses.length > 0 : false,
    surveyResponses: undefined, // レスポンスから除外
  }));
};

export const getSurveyById = async (id: string) => {
  const survey = await prisma.survey.findUnique({
    where: { id },
  });
  return survey;
};
