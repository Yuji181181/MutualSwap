import { prisma } from "@/lib/prisma";

export const deleteSurvey = async (id: string) => {
  const survey = await prisma.survey.delete({
    where: { id },
  });
  return survey;
};
