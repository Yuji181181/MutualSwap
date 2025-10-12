import { z } from "zod";

// 回答ページで表示するアンケート情報
export const surveyAnswerSchema = z.object({
  id: z.string(),
  title: z.string(),
  googleFormUrl: z.string(),
  questionCount: z.number(),
});

// 回答済みチェックのレスポンス
export const surveyAnswerStatusSchema = z.object({
  hasAnswered: z.boolean(),
});

// 回答完了のレスポンス
export const surveyAnswerCompleteSchema = z.object({
  pointsEarned: z.number(),
});
