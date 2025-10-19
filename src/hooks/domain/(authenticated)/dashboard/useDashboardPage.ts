"use client";

import { useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { surveyListSchema } from "@/schemas/api/read";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useDashboardPage = () => {
  const searchParams = useSearchParams();
  const shouldRefresh = searchParams.get("refresh");

  const swrKey = useMemo(
    () =>
      shouldRefresh === "true" ? "/api/survey?refresh=true" : "/api/survey",
    [shouldRefresh],
  );

  const { data, isLoading, isError, error, mutate } = useCustomizedSWR(
    swrKey,
    surveyListSchema,
  );

  return {
    surveys: data ?? [],
    isLoading,
    isError,
    error,
    mutate,
  } as const;
};
