import type { createSurveyRequestSchema } from "@/schemas/api/create";
import type { deleteSurveyResponseSchema } from "@/schemas/api/deleteSurvey";
import type {
  mypageResponseSchema,
  mypageSurveyListSchema,
  mypageSurveySchema,
  mypageUserSchema,
} from "@/schemas/api/mypage";
import type { pointHistorySchema } from "@/schemas/api/point";
import type { surveyListSchema, surveySchema } from "@/schemas/api/read";
import type { surveyParamsSchema } from "@/schemas/api/survey";
import type { updateSurveyRequestSchema } from "@/schemas/api/update";
import type { userRankingResponseSchema } from "@/schemas/api/users";

import type { z } from "zod";

export type SurveyList = z.infer<typeof surveyListSchema>;
export type Survey = z.infer<typeof surveySchema>;
export type SurveyParams = z.infer<typeof surveyParamsSchema>;
export type UpdateSurveyRequest = z.infer<typeof updateSurveyRequestSchema>;
export type UpdateSurveyResponse = z.infer<typeof surveySchema>;
export type CreateSurveyRequest = z.infer<typeof createSurveyRequestSchema>;
export type CreateSurveyResponse = z.infer<typeof surveySchema>;
export type MypageSurvey = z.infer<typeof mypageSurveySchema>;
export type MypageSurveyList = z.infer<typeof mypageSurveyListSchema>;
export type MypageUser = z.infer<typeof mypageUserSchema>;
export type MypageResponse = z.infer<typeof mypageResponseSchema>;
export type DeleteSurveyResponse = z.infer<typeof deleteSurveyResponseSchema>;
export type pointHistoryResponse = z.infer<typeof pointHistorySchema>;
export type userRankingResponse = z.infer<typeof userRankingResponseSchema>;
