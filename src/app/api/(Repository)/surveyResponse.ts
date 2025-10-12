import { prisma } from "@/lib/prisma";

// 回答記録を作成
export const createSurveyResponse = async (
  userId: string,
  surveyId: string,
) => {
  const survey = await prisma.survey.findUnique({
    where: { id: surveyId },
    select: { questionCount: true },
  });

  if (!survey) {
    throw new Error("Survey not found");
  }

  const pointsEarned = survey.questionCount;

  // 回答記録とポイント付与をトランザクションで実行
  const result = await prisma.$transaction(async (tx) => {
    // 回答記録を作成
    const surveyResponse = await tx.surveyResponse.create({
      data: {
        userId,
        surveyId,
        pointsEarned,
      },
    });

    // ユーザーのポイントを更新
    await tx.user.update({
      where: { id: userId },
      data: {
        currentPoints: { increment: pointsEarned },
        totalEarnedPoints: { increment: pointsEarned },
      },
    });

    // ポイント履歴を記録
    await tx.pointTransaction.create({
      data: {
        userId,
        surveyId,
        transactionType: "earned",
        points: pointsEarned,
        description: `アンケート回答で${pointsEarned}ポイント獲得`,
      },
    });

    return surveyResponse;
  });

  return result;
};

// ユーザーが特定のアンケートに回答済みか確認
export const checkSurveyResponse = async (userId: string, surveyId: string) => {
  const response = await prisma.surveyResponse.findUnique({
    where: {
      userId_surveyId: {
        userId,
        surveyId,
      },
    },
  });

  return response !== null;
};
