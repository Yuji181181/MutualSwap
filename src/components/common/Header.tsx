"use server";

import { useUser } from "@/app/actions/useUser";
import { userAuthenticationCheck } from "@/app/actions/userAuthenticationCheck";
import { PointDisplay } from "@/components/common/PointDisplay";
import { UserDropdown } from "@/components/common/UserDropdown";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Coins, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import Link from "next/link";

export default async function Header() {
  const userId = await userAuthenticationCheck();
  if (!userId) redirect("/login");
  const user = await useUser(userId);

  return (
    <header className="sticky top-0 z-50 border-border/40 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <Link href="/">
              <h1 className="cursor-pointer bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-2xl text-transparent transition-all duration-300 hover:opacity-80">
                MutualSwap
              </h1>
            </Link>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              {/* ポイント表示 */}
              <Suspense fallback={<PointDisplaySkeleton />}>
                <PointDisplay initialPoints={user.currentPoints} />
              </Suspense>

              <div className="flex items-center gap-3">
                <Separator orientation="vertical" className="h-8" />
                <UserDropdown user={user} />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// ポイント表示のスケルトン
const PointDisplaySkeleton = () => {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-secondary/10 px-3 py-2">
      <Coins className="h-5 w-5 text-secondary" />
      <Skeleton className="h-5 w-12" />
    </div>
  );
};
