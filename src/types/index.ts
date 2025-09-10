import type { z } from "zod";
import type {
  PointTransactionSchema,
  SurveyResponseSchema,
  SurveySchema,
  TransactionTypeSchema,
  UserSchema,
} from "../schemas";

export type User = z.infer<typeof UserSchema>;

export type Survey = z.infer<typeof SurveySchema>;

export type SurveyResponse = z.infer<typeof SurveyResponseSchema>;

export type PointTransaction = z.infer<typeof PointTransactionSchema>;

export type TransactionType = z.infer<typeof TransactionTypeSchema>;
