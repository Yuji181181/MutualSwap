import { normalizeDeadlineToISO } from "@/lib/formatter";
import { createSurveyRequestSchema } from "@/schemas/api/create";
import { updateSurveyRequestSchema } from "@/schemas/api/update";
import { z } from "zod";

// Survey作成用フォームスキーマ
export const createSurveyFormSchema = createSurveyRequestSchema.extend({
  deadline: z
    .preprocess((v) => normalizeDeadlineToISO(v), z.string().datetime())
    .optional(),
});

// Survey更新用フォームスキーマ
export const updateSurveyFormSchema = updateSurveyRequestSchema.extend({
  deadline: z
    .preprocess((v) => normalizeDeadlineToISO(v), z.string().datetime())
    .optional(),
});

export type CreateSurveyFormValues = z.infer<typeof createSurveyFormSchema>;
export type UpdateSurveyFormValues = z.infer<typeof updateSurveyFormSchema>;
