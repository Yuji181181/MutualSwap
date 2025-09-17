import type { deleteSurveyResponseSchema } from "@/schemas/api/deleteSurvey";
import type { pointHistorySchema } from "@/schemas/api/point";
import type { surveyListSchema } from "@/schemas/api/survey";
import type { userRankingResponseSchema } from "@/schemas/api/users";
import type { z } from "zod";

export type SurveyList = z.infer<typeof surveyListSchema>;
export type DeleteSurveyResponse = z.infer<typeof deleteSurveyResponseSchema>;
export type pointHistoryResponse = z.infer<typeof pointHistorySchema>;
export type userRankingResponse = z.infer<typeof userRankingResponseSchema>;
