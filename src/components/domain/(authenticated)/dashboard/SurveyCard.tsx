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
      className={`group hover:-translate-y-1 cursor-pointer border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 ${
        isInactive ? "bg-muted/30 opacity-70" : "bg-card/80 backdrop-blur-sm"
      }`}
      tabIndex={0}
    >
      <CardHeader className="relative">
        {/* Gradient overlay on hover */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-all duration-300 group-hover:ring-primary/40">
              <AvatarImage
                src={props.survey.user.image ?? "/placeholder.svg"}
              />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                {props.survey.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-balance text-lg transition-colors duration-300 group-hover:text-primary">
                  <span>{props.survey.title}</span>
                </CardTitle>
                {isInactive && (
                  <Badge variant="secondary" className="text-xs">
                    回答受付終了
                  </Badge>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-medium text-muted-foreground text-sm">
                  {props.survey.user.name}
                </span>
                <span className="text-muted-foreground/60 text-xs">
                  {formatDate(props.survey.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-6 text-pretty leading-relaxed">
          {props.survey.description ?? "説明はありません"}
        </CardDescription>

        <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
              <span>📝</span> {props.survey.questionCount}問
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 font-medium text-accent">
              <span>📅</span> {formatDate(props.survey.deadline)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isOwnSurvey && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/survey/${props.survey.id}/answer`);
                }}
                className="gap-1.5 transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
                className="gap-1.5 border-primary/30 transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/5 hover:shadow-md"
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
