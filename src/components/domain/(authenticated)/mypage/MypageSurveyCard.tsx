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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/formatter";
import type { MypageSurvey } from "@/types/api/survey";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

interface MypageSurveyCardProps {
  survey: MypageSurvey;
  onDelete: (id: string) => Promise<void>;
}

export const MypageSurveyCard: React.FC<MypageSurveyCardProps> = (props) => {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await props.onDelete(props.survey.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("削除に失敗しました", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card
        className="group hover:-translate-y-1 cursor-pointer border-2 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
        onClick={() => router.push(`/survey/${props.survey.id}`)}
        tabIndex={0}
      >
        <CardHeader className="relative">
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
                  {!props.survey.isActive && (
                    <Badge
                      variant="secondary"
                      className="bg-muted/50 backdrop-blur-sm"
                    >
                      非公開
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
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteDialogOpen(true);
                }}
                className="gap-1.5 border-destructive/30 transition-all duration-300 hover:scale-105 hover:border-destructive hover:bg-destructive/5 hover:text-destructive hover:shadow-md"
                title="この投稿を削除"
              >
                <Trash2 className="h-4 w-4" />
                削除
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent
          onClick={(e) => e.stopPropagation()}
          className="border-2 border-destructive/20 bg-card/95 backdrop-blur-xl"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive text-xl">
              <Trash2 className="h-5 w-5" />
              投稿を削除しますか?
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed">
              この操作は取り消せません。本当に「
              <span className="font-semibold text-foreground">
                {props.survey.title}
              </span>
              」を削除してもよろしいですか?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
              className="transition-all duration-300 hover:scale-105"
            >
              キャンセル
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <span className="animate-spin">🔄</span>
                  削除中...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  削除
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
