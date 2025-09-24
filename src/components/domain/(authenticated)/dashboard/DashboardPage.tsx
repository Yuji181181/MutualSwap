"use client";

import { SurveyCard } from "@/components/domain/(authenticated)/dashboard/SurveyCard";
import { SurveyCardSkeleton } from "@/components/domain/(authenticated)/dashboard/SurveyCardSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboardPage } from "@/hooks/domain/(authenticated)/useDashboardPage";
import { authClient } from "@/lib/auth-client";
import type React from "react";

const DashboardPage: React.FC = () => {
  const { surveys, isLoading, isError } = useDashboardPage();
  const { data: session } = authClient.useSession();
  const currentUserId = session?.user?.id;

  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-balance text-lg">エラー</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  データの取得に失敗しました。時間をおいて再度お試しください。
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="grid gap-6">
            {isLoading
              ? [...Array(4)].map((_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <SurveyCardSkeleton key={index} />
                ))
              : surveys.map((survey) => (
                  <SurveyCard
                    key={survey.id}
                    survey={survey}
                    currentUserId={currentUserId}
                  />
                ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
