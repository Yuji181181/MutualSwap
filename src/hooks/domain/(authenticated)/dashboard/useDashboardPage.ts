"use client";

import { useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { surveyListSchema } from "@/schemas/api/read";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useDashboardPage = () => {
  const searchParams = useSearchParams();
  const shouldRefresh = searchParams.get("refresh");

  // タイムスタンプをキーに含めることで、SWRに異なるリクエストとして認識させる
  const swrKey = useMemo(() => {
    if (shouldRefresh === "true") {
      // refreshパラメータがある場合、タイムスタンプを付けて強制的に再取得
      return `/api/survey?_t=${Date.now()}`;
    }
    return "/api/survey";
  }, [shouldRefresh]);

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
