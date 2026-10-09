"use client";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import NavigationMenu from "./navigation-menu";

export function DashboardSidebar() {
  return (
    <aside className="hidden w-64 min-h-full shrink-0 border-r bg-background md:flex  md:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-xl font-bold tracking-tight">PlanDa</span>
      </div>

      {/* Main navigation */}
      <NavigationMenu />
      {/* Footer */}
      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="h-4 w-4" />
          Настройки
        </Button>
      </div>
    </aside>
  );
}
