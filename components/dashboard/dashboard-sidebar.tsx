"use client";

import {
  CalendarDays,
  CheckSquare,
  CircleDollarSign,
  LayoutDashboard,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function DashboardSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-xl font-bold tracking-tight">PlanDa</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <Button variant="secondary" className="w-full justify-start gap-3">
          <LayoutDashboard className="h-4 w-4" />
          Обзор
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3">
          <CheckSquare className="h-4 w-4" />
          Задачи
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3">
          <CalendarDays className="h-4 w-4" />
          Календарь
        </Button>

        <Button variant="ghost" className="w-full justify-start gap-3">
          <CircleDollarSign className="h-4 w-4" />
          Финансы
        </Button>
      </nav>

      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="h-4 w-4" />
          Настройки
        </Button>
      </div>
    </aside>
  );
}
