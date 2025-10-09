"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type React from "react";

export const ProfileHeaderSkeleton: React.FC = () => {
  return (
    <Card>
      <CardContent className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
          {/* アバター */}
          <Skeleton className="size-20 rounded-full sm:size-24" />

          {/* ユーザー情報 */}
          <div className="flex flex-1 flex-col gap-4">
            {/* 名前と学年 */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-20" />
            </div>

            <Separator />

            {/* 統計情報 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-7 w-12" />
              </div>
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-7 w-16" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
