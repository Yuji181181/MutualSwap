import type {
  createSurveyRequestSchema,
  createSurveyResponseSchema,
  surveyListSchema,
  surveyParamsSchema,
  surveySchema,
  updateSurveyRequestSchema,
  updateSurveyResponseSchema,
} from "@/schemas/api/survey";
import type { z } from "zod";

export type SurveyList = z.infer<typeof surveyListSchema>;
export type Survey = z.infer<typeof surveySchema>;
export type SurveyParams = z.infer<typeof surveyParamsSchema>;
export type UpdateSurveyRequest = z.infer<typeof updateSurveyRequestSchema>;
export type UpdateSurveyResponse = z.infer<typeof updateSurveyResponseSchema>;
export type CreateSurveyRequest = z.infer<typeof createSurveyRequestSchema>;
export type CreateSurveyResponse = z.infer<typeof createSurveyResponseSchema>;
