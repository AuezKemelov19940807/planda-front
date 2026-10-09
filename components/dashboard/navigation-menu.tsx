"use client";

import {
  CalendarDays,
  CheckSquare,
  CircleDollarSign,
  LayoutDashboard,
} from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Обзор",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Задачи",
    href: "/dashboard/tasks",
    icon: CheckSquare,
  },
  {
    title: "Календарь",
    href: "/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    title: "Финансы",
    href: "/dashboard/finance",
    icon: CircleDollarSign,
  },
] as const;

export default function NavigationMenu() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1 p-4">
      {menuItems.map((item) => {
        const Icon = item.icon;

        const isActive =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              buttonVariants({
                variant: isActive ? "secondary" : "ghost",
              }),
              "w-full justify-start gap-3",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
