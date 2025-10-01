"use client";

import { useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { surveySchema } from "@/schemas/api/read";

export const useSurveyDetailPage = (props: { id: string }) => {
  const { data, isLoading, isError, error, mutate } = useCustomizedSWR(
    `/api/survey/${props.id}`,
    surveySchema,
  );

  return {
    survey: data,
    isLoading,
    isError,
    error,
    mutate,
  } as const;
};
