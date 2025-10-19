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

  // SWRのキーにrefreshパラメータを含めることで、
  // パラメータが変わると自動的にキーが変わり、再フェッチがトリガーされる
  const swrKey = useMemo(
    () =>
      shouldRefresh === "true" ? "/api/points?refresh=true" : "/api/points",
    [shouldRefresh],
  );

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
    <div className="flex items-center gap-2 rounded-lg bg-secondary/10 px-3 py-2">
      <Coins className="h-5 w-5 text-secondary" />
      <span className="font-semibold text-foreground">{points}pt</span>
    </div>
  );
};
