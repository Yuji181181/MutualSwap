import { z } from "zod";

export const surveySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  googleFormUrl: z.string(),
  questionCount: z.number(),
  deadline: z.coerce.date().nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  hasAnswered: z.boolean().optional(),
  user: z.object({
    id: z.string(),
    name: z.string(),
    grade: z.number().nullable(),
    image: z.string().nullable(),
  }),
});

export const surveyListSchema = z.array(surveySchema);
