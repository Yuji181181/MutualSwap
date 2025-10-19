"use client";

import { SurveyDetailSkeleton } from "@/components/domain/(authenticated)/survey/[id]/SurveyDetailSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDetailSurveyPage } from "@/hooks/domain/(authenticated)/survey/[id]/useDetailSurveyPage";
import { authClient } from "@/lib/auth-client";
import { formatDate } from "@/lib/formatter";
import { ExternalLink, Pencil } from "lucide-react";
import type React from "react";

export const SurveyDetailPage: React.FC<{ id: string }> = (props) => {
  const { survey, isLoading, isError } = useDetailSurveyPage({ id: props.id });
  const { data: session } = authClient.useSession();

  if (isError) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Card className="border-2 border-destructive/20 bg-card/90 shadow-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-balance text-destructive text-lg">
              <span className="text-2xl">⚠️</span>
              エラーが発生しました
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              データの取得に失敗しました。時間をおいて再度お試しください。
            </CardDescription>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (isLoading || !survey) {
    return (
      <main className="container mx-auto px-4 py-8">
        <SurveyDetailSkeleton />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="border-2 bg-card/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                <AvatarImage src={survey.user.image ?? "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                  {survey.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-balance font-semibold text-lg">
                  <span>{survey.title}</span>
                </CardTitle>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-medium text-muted-foreground text-sm">
                    {survey.user.name}
                  </span>
                  <span className="text-muted-foreground/60 text-xs">
                    {formatDate(survey.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-6 text-pretty leading-relaxed">
            {survey.description ?? "説明はありません"}
          </CardDescription>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
              <span>📝</span> {survey.questionCount}問
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-medium text-accent">
              <span>📅</span> {formatDate(survey.deadline)}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 font-medium text-secondary">
              <span>{survey.isActive ? "🟢" : "🔴"}</span>{" "}
              {survey.isActive ? "公開中" : "非公開"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => window.open(survey.googleFormUrl, "_blank")}
              className="gap-1.5 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              title="Googleフォームを新しいタブで開く"
            >
              <ExternalLink className="h-4 w-4" />
              回答する
            </Button>
            {session?.user?.id === survey.user.id && (
              <Button
                variant="outline"
                className="gap-1.5 border-primary/30 transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/5 hover:shadow-md"
                title="この投稿を編集"
                onClick={() => {
                  window.location.href = `/survey/${survey.id}/edit`;
                }}
              >
                <Pencil className="h-4 w-4" />
                編集
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default SurveyDetailPage;
