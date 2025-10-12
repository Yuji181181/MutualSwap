import { prisma } from "@/lib/prisma";

// 質問数に応じたポイントを計算
const calculatePoints = (questionCount: number): number => {
  if (questionCount <= 5) {
    return 2;
  }
  if (questionCount <= 10) {
    return 3;
  }
  return 4;
};

// 回答記録を作成
export const createSurveyResponse = async (
  userId: string,
  surveyId: string,
) => {
  const result = await prisma.$transaction(async (tx) => {
    const survey = await tx.survey.findUnique({
      where: { id: surveyId },
      select: {
        questionCount: true,
        userId: true,
        isActive: true,
        title: true,
      },
    });

    if (!survey) {
      throw new Error("アンケートが見つかりません");
    }

    // アンケートが無効化されているかチェック
    if (!survey.isActive) {
      throw new Error(
        "このアンケートは回答受付を終了しました。投稿者のポイントが不足しています。",
      );
    }

    // 投稿者のポイントをチェック
    const surveyOwner = await tx.user.findUnique({
      where: { id: survey.userId },
      select: { currentPoints: true, name: true },
    });

    if (!surveyOwner) {
      throw new Error("投稿者が見つかりません");
    }

    if (surveyOwner.currentPoints < 1) {
      // 投稿者のポイントが不足している場合、その投稿者のアンケートを無効化
      await tx.survey.updateMany({
        where: {
          userId: survey.userId,
          isActive: true,
        },
        data: { isActive: false },
      });

      throw new Error(
        "このアンケートは回答受付を終了しました。投稿者のポイントが不足しています。",
      );
    }

    const pointsEarned = calculatePoints(survey.questionCount);

    // 回答記録を作成
    const surveyResponse = await tx.surveyResponse.create({
      data: {
        userId,
        surveyId,
        pointsEarned,
      },
    });

    // 回答者にポイント付与
    const updatedResponder = await tx.user.update({
      where: { id: userId },
      data: {
        currentPoints: { increment: pointsEarned },
        totalEarnedPoints: { increment: pointsEarned },
      },
      select: { currentPoints: true },
    });

    // 回答者のポイントが1以上になった場合、その回答者の無効化されたアンケートを再有効化
    if (updatedResponder.currentPoints >= 1) {
      await tx.survey.updateMany({
        where: {
          userId: userId, // 回答者が投稿したアンケート
          isActive: false, // 無効化されているもの
        },
        data: { isActive: true },
      });
    }

    // 回答者のポイント履歴を記録
    await tx.pointTransaction.create({
      data: {
        userId,
        surveyId,
        transactionType: "earned",
        points: pointsEarned,
        description: `アンケート「${survey.title}」回答で${pointsEarned}ポイント獲得`,
      },
    });

    // 投稿者から1ポイント消費
    await tx.user.update({
      where: { id: survey.userId },
      data: {
        currentPoints: { decrement: 1 },
      },
    });

    // 投稿者のポイント消費履歴を記録
    await tx.pointTransaction.create({
      data: {
        userId: survey.userId, // 投稿者
        surveyId,
        transactionType: "spent",
        points: -1,
        description: `アンケート「${survey.title}」への回答により1ポイント消費`,
      },
    });

    // 投稿者のポイントが0になった場合、その投稿者の全てのアクティブなアンケートを自動無効化
    const updatedOwner = await tx.user.findUnique({
      where: { id: survey.userId },
      select: { currentPoints: true },
    });

    if (updatedOwner && updatedOwner.currentPoints === 0) {
      // 投稿者の全てのアクティブなアンケートを無効化
      await tx.survey.updateMany({
        where: {
          userId: survey.userId,
          isActive: true,
        },
        data: { isActive: false },
      });
    }

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
