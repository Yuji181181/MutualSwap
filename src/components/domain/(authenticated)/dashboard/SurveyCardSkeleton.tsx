import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type React from "react";

export const SurveyCardSkeleton: React.FC = () => {
  return (
    <Card className="animate-pulse border-2 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20" />
            <div>
              <CardTitle className="text-balance text-lg">
                <Skeleton className="h-6 w-48 rounded-lg bg-gradient-to-r from-muted to-muted/50" />
              </CardTitle>
              <div className="mt-2 flex items-center gap-2">
                <Skeleton className="h-4 w-24 rounded-md bg-muted/80" />
                <Skeleton className="h-4 w-20 rounded-md bg-muted/80" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-6 text-pretty">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-md bg-gradient-to-r from-muted to-muted/50" />
            <Skeleton className="h-4 w-5/6 rounded-md bg-gradient-to-r from-muted to-muted/50" />
          </div>
        </CardDescription>

        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-7 w-24 rounded-full bg-primary/20" />
            <Skeleton className="h-7 w-32 rounded-full bg-accent/20" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-28 rounded-md bg-gradient-to-r from-primary/20 to-secondary/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
