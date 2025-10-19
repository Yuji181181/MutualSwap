import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const POINT_THRESHOLDS = {
  LOW: 5,
  MEDIUM: 10,
} as const;

const POINT_REWARDS = {
  LOW: 2,
  MEDIUM: 3,
  HIGH: 4,
} as const;

const MIN_POINTS_REQUIRED = 1;

// 質問数に応じたポイントを計算
const calculatePoints = (questionCount: number): number => {
  if (questionCount <= POINT_THRESHOLDS.LOW) {
    return POINT_REWARDS.LOW;
  }
  if (questionCount <= POINT_THRESHOLDS.MEDIUM) {
    return POINT_REWARDS.MEDIUM;
  }
  return POINT_REWARDS.HIGH;
};

// アンケートの状態を一括更新（無効化or再有効化）
const updateSurveysActiveStatus = async (
  tx: Prisma.TransactionClient,
  userId: string,
  isActive: boolean,
) => {
  return tx.survey.updateMany({
    where: {
      userId,
      isActive: !isActive,
    },
    data: { isActive },
  });
};

// 投稿者のポイントが0の場合、全アンケートを無効化
const deactivateUserSurveysIfNoPoints = async (
  tx: Prisma.TransactionClient,
  userId: string,
) => {
  const user = await tx.user.findUnique({
    where: { id: userId },
    select: { currentPoints: true },
  });

  if (user && user.currentPoints === 0) {
    await updateSurveysActiveStatus(tx, userId, false);
  }
};

// 回答者のポイントが1以上なら、無効化されたアンケートを再有効化
const reactivateUserSurveysIfHasPoints = async (
  tx: Prisma.TransactionClient,
  userId: string,
  currentPoints: number,
) => {
  if (currentPoints >= MIN_POINTS_REQUIRED) {
    await updateSurveysActiveStatus(tx, userId, true);
  }
};

// ポイント履歴を記録
const createPointTransaction = async (
  tx: Prisma.TransactionClient,
  data: {
    userId: string;
    surveyId: string;
    type: "earned" | "spent";
    points: number;
    surveyTitle: string;
  },
) => {
  const isEarned = data.type === "earned";
  return tx.pointTransaction.create({
    data: {
      userId: data.userId,
      surveyId: data.surveyId,
      transactionType: data.type,
      points: isEarned ? data.points : -data.points,
      description: isEarned
        ? `アンケート「${data.surveyTitle}」回答で${data.points}ポイント獲得`
        : `アンケート「${data.surveyTitle}」への回答により${data.points}ポイント消費`,
    },
  });
};

// 回答記録を作成
export const createSurveyResponse = async (
  userId: string,
  surveyId: string,
) => {
  const result = await prisma.$transaction(async (tx) => {
    // 1. アンケート情報取得とバリデーション
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

    if (!survey.isActive) {
      throw new Error(
        "このアンケートは回答受付を終了しました。投稿者のポイントが不足しています。",
      );
    }

    // 2. 投稿者のポイント確認
    const surveyOwner = await tx.user.findUnique({
      where: { id: survey.userId },
      select: { currentPoints: true },
    });

    if (!surveyOwner) {
      throw new Error("投稿者が見つかりません");
    }

    if (surveyOwner.currentPoints < MIN_POINTS_REQUIRED) {
      await updateSurveysActiveStatus(tx, survey.userId, false);
      throw new Error(
        "このアンケートは回答受付を終了しました。投稿者のポイントが不足しています。",
      );
    }

    const pointsEarned = calculatePoints(survey.questionCount);

    // 3. 回答記録作成
    const surveyResponse = await tx.surveyResponse.create({
      data: { userId, surveyId, pointsEarned },
    });

    // 4. 回答者へのポイント付与と再有効化
    const updatedResponder = await tx.user.update({
      where: { id: userId },
      data: {
        currentPoints: { increment: pointsEarned },
        totalEarnedPoints: { increment: pointsEarned },
      },
      select: { currentPoints: true },
    });

    await reactivateUserSurveysIfHasPoints(
      tx,
      userId,
      updatedResponder.currentPoints,
    );

    await createPointTransaction(tx, {
      userId,
      surveyId,
      type: "earned",
      points: pointsEarned,
      surveyTitle: survey.title,
    });

    // 5. 投稿者からのポイント消費と無効化
    await tx.user.update({
      where: { id: survey.userId },
      data: { currentPoints: { decrement: 1 } },
    });

    await createPointTransaction(tx, {
      userId: survey.userId,
      surveyId,
      type: "spent",
      points: 1,
      surveyTitle: survey.title,
    });

    await deactivateUserSurveysIfNoPoints(tx, survey.userId);

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
