"use client";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
export function AuthButton() {
  return (
    <Button variant="outline" className="cursor-pointer">
      <Link href="/auth/login">
        <LogIn className="h-4 w-4" />
      </Link>
    </Button>
  );
}
