import DashboardPage from "@/components/domain/(authenticated)/dashboard/DashboardPage";
import { Suspense } from "react";

const Page = async () => {
  return (
    <Suspense fallback={<DashboardPageSkeleton />}>
      <DashboardPage />
    </Suspense>
  );
};

// スケルトンローダー
const DashboardPageSkeleton = () => {
  const skeletonKeys = Array.from({ length: 4 }, () => crypto.randomUUID());

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-50% via-background to-secondary/10">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="mb-8 text-center">
            <h2 className="mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-4xl text-transparent">
              アンケート一覧
            </h2>
            <p className="text-muted-foreground">
              気になるアンケートに回答してポイントを獲得しましょう
            </p>
          </div>
          <div className="grid gap-6">
            {skeletonKeys.map((key) => (
              <div
                key={key}
                className="h-48 animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
