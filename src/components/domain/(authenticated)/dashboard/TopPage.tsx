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
  ExternalLink,
  Heart,
  MessageCircle,
  Trophy,
  Users,
} from "lucide-react";
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
}

const mockSurveys: Survey[] = [
  {
    id: "1",
    title: "新しいカフェのメニューについて",
    description:
      "地域の新しいカフェのメニュー開発にご協力ください。あなたの好みを教えてください！",
    url: "https://forms.google.com/example1",
    author: "田中太郎",
    authorAvatar: "/japanese-man.png",
    points: 50,
    responses: 127,
    likes: 23,
    comments: 8,
    category: "ライフスタイル",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "通勤・通学の交通手段調査",
    description: "都市部の交通渋滞解決のための研究にご協力ください。",
    url: "https://forms.google.com/example2",
    author: "佐藤花子",
    authorAvatar: "/japanese-woman.png",
    points: 75,
    responses: 89,
    likes: 15,
    comments: 4,
    category: "社会問題",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    title: "スマートフォンアプリの使用習慣",
    description: "モバイルアプリの利用パターンに関する調査です。",
    url: "https://forms.google.com/example3",
    author: "山田次郎",
    authorAvatar: "/japanese-businessman.png",
    points: 100,
    responses: 203,
    likes: 41,
    comments: 12,
    category: "テクノロジー",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    title: "スマートフォンアプリの使用習慣",
    description: "モバイルアプリの利用パターンに関する調査です。",
    url: "https://forms.google.com/example3",
    author: "山田次郎",
    authorAvatar: "/japanese-businessman.png",
    points: 100,
    responses: 203,
    likes: 41,
    comments: 12,
    category: "テクノロジー",
    createdAt: "2024-01-13",
  },
  {
    id: "5",
    title: "スマートフォンアプリの使用習慣",
    description: "モバイルアプリの利用パターンに関する調査です。",
    url: "https://forms.google.com/example3",
    author: "山田次郎",
    authorAvatar: "/japanese-businessman.png",
    points: 100,
    responses: 203,
    likes: 41,
    comments: 12,
    category: "テクノロジー",
    createdAt: "2024-01-13",
  },
  {
    id: "6",
    title: "スマートフォンアプリの使用習慣",
    description: "モバイルアプリの利用パターンに関する調査です。",
    url: "https://forms.google.com/example3",
    author: "山田次郎",
    authorAvatar: "/japanese-businessman.png",
    points: 100,
    responses: 203,
    likes: 41,
    comments: 12,
    category: "テクノロジー",
    createdAt: "2024-01-13",
  },
];

export default function TopPage() {
  const [surveys, setSurveys] = useState<Survey[]>(mockSurveys);

  const handleLike = (surveyId: string) => {
    setSurveys(
      surveys.map((survey) =>
        survey.id === surveyId
          ? { ...survey, likes: survey.likes + 1 }
          : survey,
      ),
    );
  };

  const handleResponse = (surveyId: string) => {
    setSurveys(
      surveys.map((survey) =>
        survey.id === surveyId
          ? { ...survey, responses: survey.responses + 1 }
          : survey,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Survey List */}
        <div className="space-y-6">
          <h2 className="font-semibold text-foreground text-xl">
            最新のアンケート
          </h2>
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
                          src={survey.authorAvatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>{survey.author[0]}</AvatarFallback>
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
                            {survey.author}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            •
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {survey.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">{survey.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-pretty">
                    {survey.description}
                  </CardDescription>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {survey.responses}回答
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {survey.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {survey.comments}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-primary">
                        <Trophy className="h-4 w-4" />
                        {survey.points}pt
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLike(survey.id)}
                        className="gap-1"
                      >
                        <Heart className="h-4 w-4" />
                        いいね (+5pt)
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          handleResponse(survey.id);
                          window.open(survey.url, "_blank");
                        }}
                        className="gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        回答する (+10pt)
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
}
