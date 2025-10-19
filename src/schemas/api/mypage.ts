import { z } from "zod";

// マイページ投稿取得のレスポンススキーマ
export const mypageSurveySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  googleFormUrl: z.string(),
  questionCount: z.number(),
  deadline: z.coerce.date().nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    grade: z.number().nullable(),
    image: z.string().nullable(),
  }),
});

export const mypageSurveyListSchema = z.array(mypageSurveySchema);

// マイページユーザー情報のスキーマ
export const mypageUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  grade: z.number().nullable(),
  image: z.string().nullable(),
  currentPoints: z.number(),
  totalEarnedPoints: z.number(),
  createdAt: z.coerce.date(),
});

// マイページデータ全体のスキーマ
export const mypageDataSchema = z.object({
  surveys: mypageSurveyListSchema,
  user: mypageUserSchema.nullable(),
});
