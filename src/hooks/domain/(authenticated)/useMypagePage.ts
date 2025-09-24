"use client";

import { useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { mypageResponseSchema } from "@/schemas/api/mypage";

export const useMypagePage = () => {
  const { data, isLoading, isError, mutate } = useCustomizedSWR(
    "/api/mypage",
    mypageResponseSchema,
  );

  return {
    user: data?.user ?? null,
    surveys: data?.surveys ?? [],
    isLoading,
    isError,
    mutate,
  } as const;
};
