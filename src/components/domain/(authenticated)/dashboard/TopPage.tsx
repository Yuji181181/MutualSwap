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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ExternalLink,
  Heart,
  MessageCircle,
  Plus,
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
];

export default function TopPage() {
  const [surveys, setSurveys] = useState<Survey[]>(mockSurveys);
  const [userPoints, setUserPoints] = useState(250);
  const [newSurvey, setNewSurvey] = useState({
    title: "",
    description: "",
    url: "",
    category: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmitSurvey = () => {
    if (newSurvey.title && newSurvey.url) {
      const survey: Survey = {
        id: Date.now().toString(),
        title: newSurvey.title,
        description: newSurvey.description,
        url: newSurvey.url,
        author: "あなた",
        authorAvatar: "/diverse-user-avatars.png",
        points: 25,
        responses: 0,
        likes: 0,
        comments: 0,
        category: newSurvey.category || "その他",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setSurveys([survey, ...surveys]);
      setUserPoints(userPoints + 25);
      setNewSurvey({ title: "", description: "", url: "", category: "" });
      setIsDialogOpen(false);
    }
  };

  const handleLike = (surveyId: string) => {
    setSurveys(
      surveys.map((survey) =>
        survey.id === surveyId
          ? { ...survey, likes: survey.likes + 1 }
          : survey,
      ),
    );
    setUserPoints(userPoints + 5);
  };

  const handleResponse = (surveyId: string) => {
    setSurveys(
      surveys.map((survey) =>
        survey.id === surveyId
          ? { ...survey, responses: survey.responses + 1 }
          : survey,
      ),
    );
    setUserPoints(userPoints + 10);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="font-bold text-2xl text-foreground">
                アンケート共有掲示板
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-secondary/10 px-3 py-2">
                <Trophy className="h-5 w-5 text-secondary" />
                <span className="font-semibold text-foreground">
                  {userPoints}pt
                </span>
              </div>
              <Button variant="outline" asChild>
                <a href="/login">ログイン</a>
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    アンケート投稿
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>新しいアンケートを投稿</DialogTitle>
                    <DialogDescription>
                      Google
                      Formのアンケートを共有して、コミュニティからの回答を集めましょう。
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">タイトル</Label>
                      <Input
                        id="title"
                        value={newSurvey.title}
                        onChange={(e) =>
                          setNewSurvey({ ...newSurvey, title: e.target.value })
                        }
                        placeholder="アンケートのタイトルを入力"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">説明</Label>
                      <Textarea
                        id="description"
                        value={newSurvey.description}
                        onChange={(e) =>
                          setNewSurvey({
                            ...newSurvey,
                            description: e.target.value,
                          })
                        }
                        placeholder="アンケートの詳細を説明してください"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="url">Google Form URL</Label>
                      <Input
                        id="url"
                        value={newSurvey.url}
                        onChange={(e) =>
                          setNewSurvey({ ...newSurvey, url: e.target.value })
                        }
                        placeholder="https://forms.google.com/..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">カテゴリー</Label>
                      <Input
                        id="category"
                        value={newSurvey.category}
                        onChange={(e) =>
                          setNewSurvey({
                            ...newSurvey,
                            category: e.target.value,
                          })
                        }
                        placeholder="例: ライフスタイル、テクノロジー"
                      />
                    </div>
                    <Button onClick={handleSubmitSurvey} className="w-full">
                      投稿する (+25pt)
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

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
