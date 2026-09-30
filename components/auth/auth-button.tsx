"use client";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
export function AuthButton() {
  return (
    <Link
      href="/auth/login"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
    >
      <LogIn className="h-4 w-4" />
    </Link>
  );
}
