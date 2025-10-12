import { prisma } from "@/lib/prisma";
import type { CreateSurveyRequest } from "@/types/api/survey";

export const createSurvey = async (
  userId: string,
  data: CreateSurveyRequest,
) => {
  // deadlineをDate型に変換
  const processedData = {
    ...data,
    deadline: data.deadline ? new Date(data.deadline) : undefined,
  };

  const survey = await prisma.$transaction(async (tx) => {
    // ユーザーのポイントをチェック（最低1ポイント必要）
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { currentPoints: true },
    });

    if (!user || user.currentPoints < 1) {
      throw new Error(
        "ポイントが不足しています。アンケートを投稿するには最低1ポイント必要です。",
      );
    }

    const newSurvey = await tx.survey.create({
      data: {
        ...processedData,
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

    return newSurvey;
  });

  return survey;
};
