"use server";

import { useUser } from "@/app/actions/useUser";
import { userAuthenticationCheck } from "@/app/actions/userAuthenticationCheck";
import { PointDisplay } from "@/components/common/PointDisplay";
import { UserDropdown } from "@/components/common/UserDropdown";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";
import { redirect } from "next/navigation";

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
              <PointDisplay initialPoints={user.currentPoints} />

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
