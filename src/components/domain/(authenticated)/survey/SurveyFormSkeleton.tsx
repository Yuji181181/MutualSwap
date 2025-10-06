import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type React from "react";

export const SurveyFormSkeleton: React.FC = () => {
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-7 w-32" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-48" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* タイトル */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-64" />
          </div>

          {/* 説明 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-32 w-full" />
          </div>

          {/* GoogleフォームURL */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-56" />
          </div>

          {/* 設問数 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-72" />
          </div>

          {/* 締切 */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* ボタン */}
          <div className="flex justify-end gap-3">
            <Skeleton className="h-10 w-28 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
