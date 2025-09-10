import type { surveyListSchema } from "@/schema/api/survey";
import type { z } from "zod";

export type SurveyList = z.infer<typeof surveyListSchema>;
