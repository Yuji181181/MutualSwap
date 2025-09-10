import type { surveyListSchema } from "@/schemas/api/survey";
import type { z } from "zod";

export type SurveyList = z.infer<typeof surveyListSchema>;
