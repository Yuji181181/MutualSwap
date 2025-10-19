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
    <Card className="border-2 border-primary/10 bg-card/90 shadow-xl backdrop-blur-sm">
      <CardContent className="px-4 pt-8 pb-6 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-6">
          {/* アバター */}
          <Avatar className="size-20 ring-4 ring-primary/20 ring-offset-2 ring-offset-background sm:size-24">
            <AvatarImage src={props.user.image ?? "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-2xl text-primary-foreground">
              {props.user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* ユーザー情報 */}
          <div className="flex flex-1 flex-col gap-4">
            {/* 名前と学年 */}
            <div className="flex flex-col gap-2">
              <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-2xl text-transparent">
                {props.user.name}
              </h1>
              {props.user.grade !== null && (
                <Badge
                  variant="secondary"
                  className="w-fit bg-gradient-to-r from-primary/10 to-secondary/10"
                >
                  {props.user.grade}年生
                </Badge>
              )}
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* 統計情報 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 rounded-xl bg-primary/5 p-4 transition-all duration-300 hover:bg-primary/10">
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <FileText className="size-4 text-primary" />
                  <span>投稿数</span>
                </div>
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold text-transparent text-xl">
                  {props.surveyCount}
                </span>
              </div>

              <div className="flex flex-col gap-1 rounded-xl bg-accent/5 p-4 transition-all duration-300 hover:bg-accent/10">
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <Coins className="size-4 text-accent" />
                  <span>累計獲得ポイント</span>
                </div>
                <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text font-semibold text-transparent text-xl">
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
