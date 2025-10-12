import { z } from "zod";

export const deleteSurveyResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  googleFormUrl: z.string(),
  questionCount: z.number(),
  deadline: z.coerce.date().nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
});
