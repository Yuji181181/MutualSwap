"use client";

import { useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { surveyListSchema } from "@/schemas/api/read";

export const useDashboardPage = () => {
  const { data, isLoading, isError, mutate } = useCustomizedSWR(
    "/api/survey",
    surveyListSchema,
  );

  return {
    surveys: data ?? [],
    isLoading,
    isError,
    mutate,
  } as const;
};
