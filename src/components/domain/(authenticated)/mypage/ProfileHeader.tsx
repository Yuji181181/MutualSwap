"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Coins, FileText } from "lucide-react";
import type React from "react";

interface ProfileHeaderProps {
  user: {
    id: string;
    name: string;
    grade: number | null;
    image: string | null;
    totalEarnedPoints: number;
  };
  surveyCount: number;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  return (
    <Card>
      <CardContent className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
          {/* アバター */}
          <Avatar className="size-20 sm:size-24">
            <AvatarImage src={props.user.image ?? "/placeholder.svg"} />
            <AvatarFallback>{props.user.name.charAt(0)}</AvatarFallback>
          </Avatar>

          {/* ユーザー情報 */}
          <div className="flex flex-1 flex-col gap-4">
            {/* 名前と学年 */}
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">{props.user.name}</h1>
              {props.user.grade !== null && (
                <Badge variant="secondary" className="w-fit">
                  {props.user.grade}年生
                </Badge>
              )}
            </div>

            <Separator />

            {/* 統計情報 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <FileText className="size-4" />
                  <span>投稿数</span>
                </div>
                <span className="font-semibold text-foreground text-xl">
                  {props.surveyCount}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <Coins className="size-4" />
                  <span>累計獲得ポイント</span>
                </div>
                <span className="font-semibold text-foreground text-xl">
                  {props.user.totalEarnedPoints}pt
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
