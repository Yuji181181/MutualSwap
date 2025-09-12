import { z } from "zod";

// 新規作成リクエストボディ用
export const createSurveyRequestSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  googleFormUrl: z.string().url(),
  questionCount: z.number().int().min(1),
  deadline: z.string().datetime().optional(),
});
