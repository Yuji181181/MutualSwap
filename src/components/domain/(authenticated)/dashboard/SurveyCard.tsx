"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/formatter";
import type { surveyListSchema } from "@/schemas/api/survey";
import { ExternalLink, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import type { z } from "zod";

interface SurveyCardProps {
  survey: z.infer<typeof surveyListSchema>[0];
  currentUserId?: string;
}

export const SurveyCard: React.FC<SurveyCardProps> = (props) => {
  const router = useRouter();
  const isOwnSurvey = props.currentUserId === props.survey.user.id;
  const hasAnswered = props.survey.hasAnswered ?? false;
  const isInactive = !props.survey.isActive;

  return (
    <Card
      key={props.survey.id}
      className={`cursor-pointer transition-shadow hover:shadow-lg ${
        isInactive ? "bg-muted/50 opacity-60" : ""
      }`}
      onClick={() => router.push(`/survey/${props.survey.id}`)}
      tabIndex={0}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage
                src={props.survey.user.image ?? "/placeholder.svg"}
              />
              <AvatarFallback>
                {props.survey.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-balance text-lg">
                  <span>{props.survey.title}</span>
                </CardTitle>
                {isInactive && (
                  <Badge variant="secondary" className="text-xs">
                    回答受付終了
                  </Badge>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  {props.survey.user.name}
                </span>
                <span className="text-muted-foreground text-xs">
                  {formatDate(props.survey.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 text-pretty">
          {props.survey.description ?? "説明はありません"}
        </CardDescription>

        <div className="flex flex-col gap-2 text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>設問数: {props.survey.questionCount}</span>
            <span>期限: {formatDate(props.survey.deadline)}</span>
          </div>

          <div className="flex items-center gap-2">
            {!isOwnSurvey && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/survey/${props.survey.id}/answer`);
                }}
                className="gap-1"
                title={
                  isInactive
                    ? "回答受付終了"
                    : hasAnswered
                      ? "回答済みです"
                      : "アンケートに回答する"
                }
                disabled={hasAnswered || isInactive}
              >
                <ExternalLink className="h-4 w-4" />
                {hasAnswered ? "回答済み" : "回答する"}
              </Button>
            )}
            {isOwnSurvey && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/survey/${props.survey.id}/edit`);
                }}
                className="gap-1"
                title="この投稿を編集"
              >
                <Pencil className="h-4 w-4" />
                編集
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
