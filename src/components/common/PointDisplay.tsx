"use client";

import { useCustomizedSWR } from "@/hooks/common/useCustomizedSWR";
import { userPointsSchema } from "@/schemas/api/users";
import { Coins } from "lucide-react";
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

  const { data } = useCustomizedSWR(swrKey, userPointsSchema);

  const points = data?.currentPoints ?? initialPoints;

  return (
    <div className="flex items-center gap-2 rounded-lg bg-secondary/10 px-3 py-2">
      <Coins className="h-5 w-5 text-secondary" />
      <span className="font-semibold text-foreground">{points}pt</span>
    </div>
  );
};
