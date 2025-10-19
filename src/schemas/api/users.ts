import { z } from "zod";

export const userPointsSchema = z.object({
  currentPoints: z.number(),
});

export const userRankingResponseSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    grade: z.number().nullable(),
    currentPoints: z.number(),
    totalEarnedPoints: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    image: z.string().nullable(),
  }),
);
