import { z } from "zod";

// マイページ投稿取得のレスポンススキーマ
export const mypageSurveySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  googleFormUrl: z.string(),
  questionCount: z.number(),
  deadline: z.date().nullable(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const mypageSurveyListSchema = z.array(mypageSurveySchema);

export const mypageUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  grade: z.number().nullable(),
  image: z.string().nullable(),
  totalEarnedPoints: z.number(),
  currentPoints: z.number(),
});

export const mypageResponseSchema = z.object({
  user: mypageUserSchema.nullable(),
  surveys: mypageSurveyListSchema,
});
