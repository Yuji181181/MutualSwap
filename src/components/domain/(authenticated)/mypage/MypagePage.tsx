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
import { Skeleton } from "@/components/ui/skeleton";
import { useMypagePage } from "@/hooks/domain/(authenticated)/useMypagePage";
import { formatDate } from "@/lib/formatter";
import { cn } from "@/lib/utils";
import type { MypageSurvey, MypageUser } from "@/types/api/survey";
import { ExternalLink, Medal, Trophy, User } from "lucide-react";
import type React from "react";

const gradeMap: Record<number, string> = {
  1: "1年生",
  2: "2年生",
  3: "3年生",
  4: "4年生",
} as const;

const getGradeLabel = (grade: number | null | undefined) => {
  if (!grade) return "学年未設定";
  return gradeMap[grade] ?? "学年未設定";
};

const MypagePage: React.FC = () => {
  const { user, surveys, isLoading, isError } = useMypagePage();

  if (isLoading) {
    return <MypageSkeleton />;
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <ProfileSection user={user} totalSurveys={surveys.length} />
          <SurveyListSection surveys={surveys} />
        </div>
      </main>
    </div>
  );
};

interface ProfileSectionProps {
  user: MypageUser | null;
  totalSurveys: number;
}

const ProfileSection: React.FC<ProfileSectionProps> = (props) => {
  return (
    <section>
      <Card className="border-primary/20">
        <CardHeader className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage
                src={props.user?.image ?? undefined}
                alt={props.user?.name ?? "ユーザーアイコン"}
              />
              <AvatarFallback>
                {props.user?.name?.charAt(0) ?? <User className="h-6 w-6" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-balance text-2xl">
                {props.user?.name ?? "ユーザー情報を取得できません"}
              </CardTitle>
              <p className="mt-2 text-muted-foreground text-sm">
                {props.user
                  ? getGradeLabel(props.user.grade)
                  : "学年情報が見つかりません"}
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <ProfileMetric
              icon={<Medal className="h-4 w-4" />}
              label="投稿数"
              value={props.totalSurveys}
            />
            <ProfileMetric
              icon={<Trophy className="h-4 w-4" />}
              label="累計PT"
              value={props.user?.totalEarnedPoints ?? "-"}
              description={
                props.user
                  ? `現在ポイント: ${props.user.currentPoints}pt`
                  : undefined
              }
            />
          </div>
        </CardHeader>
      </Card>
    </section>
  );
};

interface SurveyListSectionProps {
  surveys: MypageSurvey[];
}

const SurveyListSection: React.FC<SurveyListSectionProps> = (props) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground text-xl">
          投稿済みアンケート
        </h2>
        <Badge variant="secondary" className="rounded-full">
          {props.surveys.length}件
        </Badge>
      </div>

      {props.surveys.length === 0 ? (
        <NoSurveyState />
      ) : (
        <div className="grid gap-4">
          {props.surveys.map((survey) => (
            <MypageSurveyCard key={survey.id} survey={survey} />
          ))}
        </div>
      )}
    </section>
  );
};

interface MypageSurveyCardProps {
  survey: MypageSurvey;
}

const MypageSurveyCard: React.FC<MypageSurveyCardProps> = (props) => {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-balance text-lg">
              {props.survey.title}
            </CardTitle>
            <p className="mt-1 text-muted-foreground text-sm">
              公開日: {formatDate(props.survey.createdAt)}
            </p>
          </div>
          <Badge variant={props.survey.isActive ? "default" : "secondary"}>
            {props.survey.isActive ? "公開中" : "非公開"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-pretty">
          {props.survey.description ?? "説明は設定されていません"}
        </CardDescription>

        <div className="grid gap-3 sm:grid-cols-2">
          <SurveyMeta
            label="設問数"
            value={`${props.survey.questionCount}問`}
          />
          <SurveyMeta
            label="締切"
            value={formatDate(props.survey.deadline)}
            isEmphasis={!props.survey.deadline}
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-muted-foreground text-sm">
            Googleフォームへのリンクからアンケートを編集できます。
          </span>
          <Button
            size="sm"
            className="gap-1"
            onClick={() => {
              window.open(props.survey.googleFormUrl, "_blank");
            }}
          >
            <ExternalLink className="h-4 w-4" />
            フォームを開く
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const NoSurveyState: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-balance text-lg">
          投稿はまだありません
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          ダッシュボードから新しいアンケートを投稿して、マイページで進捗を確認しましょう。
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const ErrorState: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-balance text-lg">エラー</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              データの取得に失敗しました。時間をおいて再度お試しください。
            </CardDescription>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

interface ProfileMetricProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  description?: string;
}

const ProfileMetric: React.FC<ProfileMetricProps> = (props) => {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {props.icon}
      </div>
      <div>
        <p className="text-muted-foreground text-sm">{props.label}</p>
        <p className="font-semibold text-lg">{props.value}</p>
        {props.description && (
          <p className="text-muted-foreground text-xs">{props.description}</p>
        )}
      </div>
    </div>
  );
};

interface SurveyMetaProps {
  label: string;
  value: string;
  isEmphasis?: boolean;
}

const SurveyMeta: React.FC<SurveyMetaProps> = (props) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card px-4 py-3",
        props.isEmphasis && "border-destructive/40",
      )}
    >
      <p className="text-muted-foreground text-xs">{props.label}</p>
      <p className="font-semibold text-sm">{props.value}</p>
    </div>
  );
};

const MypageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <ProfileSkeletonCard />
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-16" />
            </div>
            <MypageSurveyListSkeleton />
          </section>
        </div>
      </main>
    </div>
  );
};

const ProfileSkeletonCard: React.FC = () => {
  return (
    <Card className="border-primary/20">
      <CardHeader className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </CardHeader>
    </Card>
  );
};

const MypageSurveyListSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Card key={index}>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-9 w-32" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MypagePage;
