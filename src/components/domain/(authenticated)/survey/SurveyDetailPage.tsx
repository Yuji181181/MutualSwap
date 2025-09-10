"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Heart,
  Share2,
  Tag,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Survey {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  authorAvatar: string;
  points: number;
  responses: number;
  likes: number;
  comments: number;
  category: string;
  createdAt: string;
  isLiked: boolean;
  hasResponded: boolean;
}

const mockSurvey: Survey = {
  id: "1",
  title: "新しいカフェのメニューについて",
  description:
    "地域の新しいカフェのメニュー開発にご協力ください。あなたの好みを教えてください！コーヒーの種類、デザート、軽食など、どのようなメニューがあると嬉しいかお聞かせください。皆様のご意見を参考に、地域に愛されるカフェを作りたいと思います。",
  url: "https://forms.google.com/example1",
  author: "田中太郎",
  authorAvatar: "/japanese-man.png",
  points: 50,
  responses: 127,
  likes: 23,
  comments: 8,
  category: "ライフスタイル",
  createdAt: "2024-01-15",
  isLiked: false,
  hasResponded: false,
};

export default function SurveyDetailPage() {
  const [survey] = useState<Survey>(mockSurvey);
  const [userPoints] = useState(250);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  戻る
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                <h1 className="font-bold text-foreground text-xl">
                  アンケート詳細
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-secondary/10 px-3 py-2">
                <Trophy className="h-5 w-5 text-secondary" />
                <span className="font-semibold text-foreground">
                  {userPoints}pt
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <Share2 className="h-4 w-4" />
                共有
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Survey Details */}
        <Card className="mb-8">
          <CardHeader>
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={survey.authorAvatar || "/placeholder.svg"}
                  />
                  <AvatarFallback>{survey.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="mb-2 text-balance font-bold text-2xl">
                    {survey.title}
                  </h2>
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {survey.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {survey.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      <Badge variant="secondary">{survey.category}</Badge>
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="font-bold text-2xl text-foreground">
                    {survey.responses}
                  </p>
                  <p className="text-muted-foreground text-sm">回答数</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-3 text-center">
                  <p className="font-bold text-2xl text-primary">
                    {survey.points}pt
                  </p>
                  <p className="text-muted-foreground text-sm">獲得ポイント</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-6 text-pretty text-base leading-relaxed">
              {survey.description}
            </CardDescription>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant={survey.isLiked ? "default" : "outline"}
                className="gap-2"
              >
                <Heart
                  className={`h-4 w-4 ${survey.isLiked ? "fill-current" : ""}`}
                />
                いいね {survey.isLiked ? "" : "(+5pt)"}
              </Button>
              <Button className="gap-2">
                <ExternalLink className="h-4 w-4" />
                {survey.hasResponded ? "再回答する" : "回答する (+10pt)"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
