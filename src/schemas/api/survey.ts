import { z } from "zod";

export const surveyListSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    googleFormUrl: z.string(),
    questionCount: z.number(),
    deadline: z.date().nullable(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    user: z.object({
      id: z.string(),
      name: z.string(),
      grade: z.number().nullable(),
      image: z.string().nullable(),
    }),
  }),
);

export const surveySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  googleFormUrl: z.string(),
  questionCount: z.number(),
  deadline: z.date().nullable(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    grade: z.number().nullable(),
    image: z.string().nullable(),
  }),
});

export const surveyParamsSchema = z.object({
  id: z.string().uuid(),
});

export const updateSurveyRequestSchema = z.object({
  title: z.string().max(200).optional(),
  description: z.string().optional(),
  googleFormUrl: z.string().url().optional(),
  questionCount: z.number().int().min(1).optional(),
  deadline: z.string().datetime().optional(),
  isActive: z.boolean().optional(),
});

export const updateSurveyResponseSchema = surveySchema;

// 新規作成リクエストボディ用
export const createSurveyRequestSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  googleFormUrl: z.string().url(),
  questionCount: z.number().int().min(1),
  deadline: z.string().datetime().optional(),
});

// 新規作成レスポンス用
export const createSurveyResponseSchema = surveySchema;
