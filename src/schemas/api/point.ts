import { z } from "zod";

export const pointHistorySchema = z.array(
  z.object({
    id: z.string(),
    userId: z.string(),
    surveyId: z.string().nullable(),
    transactionType: z.enum(["initial", "earned", "spent"]),
    points: z.number(),
    description: z.string().nullable(),
    createdAt: z.coerce.date(),
  }),
);
