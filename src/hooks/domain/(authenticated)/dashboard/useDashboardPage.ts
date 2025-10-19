"use client";

import { useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { surveyListSchema } from "@/schemas/api/read";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export const useDashboardPage = () => {
  const searchParams = useSearchParams();
  const shouldRefresh = searchParams.get("refresh");

  // SWRのキーにrefreshパラメータを含めることで、
  // パラメータが変わると自動的にキーが変わり、再フェッチがトリガーされる
  const swrKey = useMemo(
    () =>
      shouldRefresh === "true" ? "/api/survey?refresh=true" : "/api/survey",
    [shouldRefresh],
  );

  const { data, isLoading, isError, error, mutate } = useCustomizedSWR(
    swrKey,
    surveyListSchema,
  );

  // URLパラメータをクリーンアップ
  useEffect(() => {
    if (shouldRefresh === "true") {
      window.history.replaceState({}, "", "/dashboard");
    }
  }, [shouldRefresh]);

  return {
    surveys: data ?? [],
    isLoading,
    isError,
    error,
    mutate,
  } as const;
};
