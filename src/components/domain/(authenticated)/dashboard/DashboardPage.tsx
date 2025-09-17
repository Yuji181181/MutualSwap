"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboardPage } from "@/hooks/domain/(authenticated)/useDashboardPage";
import { formatDate } from "@/lib/formatter";
import { ExternalLink } from "lucide-react";
import type React from "react";

const DashboardPage: React.FC = () => {
  const { surveys, isLoading, isError } = useDashboardPage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="mt-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-balance text-lg">
                  読み込み中...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>データを取得しています。</CardDescription>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

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
            {surveys.map((survey) => (
              <Card
                key={survey.id}
                className="transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={survey.user.image ?? "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {survey.user.name ? survey.user.name[0] : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-balance text-lg">
                          <a
                            href={`/survey/${survey.id}`}
                            className="transition-colors hover:text-primary"
                          >
                            {survey.title}
                          </a>
                        </CardTitle>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-muted-foreground text-sm">
                            {survey.user.name}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            •
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

                  <div className="flex flex-col gap-2 text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-4">
                      <span>設問数: {survey.questionCount}</span>
                      <span>期限: {formatDate(survey.deadline)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          window.open(survey.googleFormUrl, "_blank");
                        }}
                        className="gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        回答する
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
