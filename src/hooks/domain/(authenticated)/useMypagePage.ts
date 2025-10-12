"use client";

import { useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { mypageDataSchema } from "@/schemas/api/mypage";

export const useMypagePage = () => {
  const { data, isLoading, isError, error, mutate } = useCustomizedSWR(
    "/api/mypage",
    mypageDataSchema,
  );

  return {
    surveys: data?.surveys ?? [],
    user: data?.user ?? null,
    isLoading,
    isError,
    error,
    mutate,
  } as const;
};
