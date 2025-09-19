import FabCreateButton from "@/components/common/FabCreateButton";
import Header from "@/components/common/Header";
import type React from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <FabCreateButton />
    </div>
  );
}
