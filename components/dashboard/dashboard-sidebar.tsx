"use client";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";

import NavigationMenu from "./navigation-menu";
import { DashboardUser } from "./finance/dashboard-user";
interface DashboardHeaderProps {
  user: User | null;
}
export function DashboardSidebar({ user }: DashboardHeaderProps) {
  return (
    <aside className="hidden w-64 min-h-full shrink-0 border-r bg-[#14201B] py-7 px-5 text-white md:flex  md:flex-col">
      {/* Logo */}
      <div className="flex gap-x-2.5 pb-10 items-center">
        <span className="w-9 h-9 rounded-lg bg-[#0f7a4f] flex items-center justify-center font-bold text-lg ">
          P
        </span>
        <span className="text-2xl font-extrabold">PlanDa</span>
      </div>

      {/* Main navigation */}
      <NavigationMenu />
      {/* Footer */}
      <div className="border-t pt-4">
        <DashboardUser user={user} />

        {/* <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="h-4 w-4" />
          Настройки
        </Button> */}
      </div>
    </aside>
  );
}
