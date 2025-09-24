import type { surveyListSchema } from "@/schemas/api/survey";
import type { z } from "zod";

export interface EditSurveyPageProps {
  id: string;
}
export interface SurveyDetailPageProps {
  id: string;
}

export interface SurveyCardProps {
  survey: z.infer<typeof surveyListSchema>[0];
  currentUserId?: string;
}
