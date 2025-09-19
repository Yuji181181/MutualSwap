"use client";

import { SurveyDetailSkeleton } from "@/components/domain/(authenticated)/survey/SurveyDetailSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSurveyDetailPage } from "@/hooks/domain/(authenticated)/useSurveyDetailPage";
import { formatDate } from "@/lib/formatter";
import { ExternalLink } from "lucide-react";
import type React from "react";

interface SurveyDetailPageProps {
  id: string;
}

export const SurveyDetailPage: React.FC<SurveyDetailPageProps> = (props) => {
  const { survey, isLoading, isError } = useSurveyDetailPage({ id: props.id });

  if (isError) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
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
        </main>
      </div>
    );
  }

  if (isLoading || !survey) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <SurveyDetailSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card className="transition-shadow hover:shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={survey.user.image ?? "/placeholder.svg"} />
                  <AvatarFallback />
                </Avatar>
                <div>
                  <CardTitle className="text-balance text-lg">
                    <span>{survey.title}</span>
                  </CardTitle>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">
                      {survey.user.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {formatDate(survey.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4 text-pretty">
              {survey.description ?? "説明はありません"}
            </CardDescription>

            <div className="mb-4 flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
              <span>設問数: {survey.questionCount}</span>
              <span>期限: {formatDate(survey.deadline)}</span>
              <span>状態: {survey.isActive ? "公開中" : "非公開"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => window.open(survey.googleFormUrl, "_blank")}
                className="gap-1"
              >
                <ExternalLink className="h-4 w-4" />
                回答する
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SurveyDetailPage;
