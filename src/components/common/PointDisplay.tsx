"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { userPointsSchema } from "@/schemas/api/users";
import { AlertCircle, Coins } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { useMemo } from "react";

interface PointDisplayProps {
  initialPoints: number;
}

export const PointDisplay: React.FC<PointDisplayProps> = ({
  initialPoints,
}) => {
  const searchParams = useSearchParams();
  const shouldRefresh = searchParams.get("refresh");

  // タイムスタンプをキーに含めることで、SWRに異なるリクエストとして認識させる
  // これにより、バックエンドを変更せずにキャッシュバストが可能
  const swrKey = useMemo(() => {
    if (shouldRefresh === "true") {
      // refreshパラメータがある場合、タイムスタンプを付けて強制的に再取得
      return `/api/points?_t=${Date.now()}`;
    }
    return "/api/points";
  }, [shouldRefresh]);

  const { data, isLoading, isError } = useCustomizedSWR(
    swrKey,
    userPointsSchema,
  );

  const points = data?.currentPoints ?? initialPoints;

  // エラー状態の表示
  if (isError) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <span className="font-semibold text-destructive text-sm">エラー</span>
      </div>
    );
  }

  // ローディング状態の表示(初回のみ、またはrefresh時)
  if (isLoading && !data) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-secondary/10 px-3 py-2">
        <Coins className="h-5 w-5 text-secondary" />
        <Skeleton className="h-5 w-12" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary/20 to-accent/20 px-4 py-2 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <Coins className="h-5 w-5 text-secondary" />
      <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text font-bold text-transparent">
        {points}pt
      </span>
    </div>
  );
};
