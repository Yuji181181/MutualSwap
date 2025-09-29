import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type React from "react";

export const NewSurveySkeleton: React.FC = () => {
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-24" />
        </CardTitle>
        <CardDescription>
          <div className="space-y-1">
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-64" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* タイトルフィールド（必須） */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-3 w-56" />
          </div>

          {/* 説明フィールド（任意） */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-32 w-full rounded-md" />
          </div>

          {/* GoogleフォームURLフィールド（必須） */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-3 w-64" />
          </div>

          {/* 設問数フィールド（必須） */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-3 w-72" />
          </div>

          {/* 期限フィールド（任意） */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* ボタン群 */}
          <div className="flex justify-end gap-3 pt-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
