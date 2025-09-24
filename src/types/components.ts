import type { surveyListSchema } from "@/schemas/api/survey";
import type { z } from "zod";

// ページコンポーネントのProps型定義
export interface EditSurveyPageProps {
  id: string;
}

export interface SurveyDetailPageProps {
  id: string;
}

// カードコンポーネントのProps型定義
export interface SurveyCardProps {
  survey: z.infer<typeof surveyListSchema>[0];
  currentUserId?: string;
}
