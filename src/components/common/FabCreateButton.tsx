"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import type React from "react";

const FabCreateButton: React.FC = () => {
  return (
    <Link href="/survey/new" aria-label="新規投稿">
      <Button
        className={cn(
          "fixed",
          "right-6",
          "bottom-6",
          "z-50",
          "h-16",
          "w-16",
          "rounded-full",
          "bg-gradient-to-br",
          "from-primary",
          "to-secondary",
          "p-0",
          "shadow-2xl",
          "shadow-primary/30",
          "transition-all",
          "duration-300",
          "hover:scale-110",
          "hover:shadow-3xl",
          "hover:shadow-primary/40",
          "active:scale-95",
        )}
        aria-label="新規投稿"
        title="新規投稿"
      >
        <span className="sr-only">新規投稿</span>
        <Plus className="h-8 w-8" />
      </Button>
    </Link>
  );
};

export default FabCreateButton;
