import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { ExternalLink } from "lucide-react";
import type React from "react";
import type { z } from "zod";

interface SurveyCardProps {
  survey: z.infer<typeof surveyListSchema>[0];
}

export const SurveyCard: React.FC<SurveyCardProps> = (props) => {
  return (
    <Card key={props.survey.id} className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={props.survey.user.image ?? "/placeholder.svg"}
              />
              <AvatarFallback>
                {props.survey.user.name ? props.survey.user.name[0] : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-balance text-lg">
                <a
                  href={`/survey/${props.survey.id}`}
                  className="transition-colors hover:text-primary"
                >
                  {props.survey.title}
                </a>
              </CardTitle>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-muted-foreground text-sm">
                  {props.survey.user.name}
                </span>
                <span className="text-muted-foreground text-xs">•</span>
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
            <Button
              size="sm"
              onClick={() => {
                window.open(props.survey.googleFormUrl, "_blank");
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
  );
};
