"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import type { User as UserType } from "@/types";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";

interface UserDropdownProps {
  user: UserType;
}

export const UserDropdown: React.FC<UserDropdownProps> = (props) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  const handleMyPageNavigation = () => {
    router.push("/mypage");
  };

  if (!props.user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={props.user.image || undefined}
            alt={props.user.name || "ユーザー"}
          />
          <AvatarFallback className="text-sm">
            {props.user.name ? props.user.name.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm">
              {props.user.name || "名前未設定"}
            </p>
            {props.user.grade && (
              <p className="text-muted-foreground text-xs">
                {props.user.grade}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleMyPageNavigation}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>マイページ</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>ログアウト</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
