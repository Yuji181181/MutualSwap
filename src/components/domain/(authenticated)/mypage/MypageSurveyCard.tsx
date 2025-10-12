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
        className="cursor-pointer transition-shadow hover:shadow-lg"
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
                <AvatarFallback />
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-balance text-lg">
                    <span>{props.survey.title}</span>
                  </CardTitle>
                  {!props.survey.isActive && (
                    <Badge variant="secondary">非公開</Badge>
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
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteDialogOpen(true);
                }}
                className="gap-1"
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
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogHeader>
            <DialogTitle>投稿を削除しますか？</DialogTitle>
            <DialogDescription>
              この操作は取り消せません。本当に「{props.survey.title}
              」を削除してもよろしいですか？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              キャンセル
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "削除中..." : "削除"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
