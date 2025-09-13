import { TransactionType } from "@prisma/client";
import { z } from "zod";

// 共通: Date の受け取りで文字列も許容
const CoercedDateSchema = z.coerce.date();

export const TransactionTypeSchema = z.nativeEnum(TransactionType);

// ============ User ============
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  grade: z.number().int().nullable(),
  image: z.string().min(1).nullable(),
  currentPoints: z.number().int().nonnegative(),
  totalEarnedPoints: z.number().int().nonnegative(),
});

// ============ Survey ============
export const SurveySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  googleFormUrl: z.string().url(),
  questionCount: z.number().int().min(1),
  deadline: CoercedDateSchema.optional(),
  isActive: z.boolean().optional(),
  createdAt: CoercedDateSchema,
  updatedAt: CoercedDateSchema,
});

// ============ SurveyResponse ============
export const SurveyResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  surveyId: z.string().uuid(),
  pointsEarned: z.number().int().min(1),
  createdAt: CoercedDateSchema,
  updatedAt: CoercedDateSchema,
});

// ============ PointTransaction ============
export const PointTransactionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  surveyId: z.string().uuid().optional(),
  transactionType: TransactionTypeSchema,
  points: z.number().int(),
  description: z.string().optional(),
  createdAt: CoercedDateSchema,
});
