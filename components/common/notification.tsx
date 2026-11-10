"use client";

import {
  Bell,
  Check,
  CircleDollarSign,
  CalendarDays,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notifications = [
  {
    id: 1,
    title: "Payment received",
    description: "You received $250 from Upwork.",
    time: "5 minutes ago",
    icon: CircleDollarSign,
    color: "text-green-500 bg-green-500/10",
    unread: true,
  },
  {
    id: 2,
    title: "New task reminder",
    description: "Finish the dashboard design.",
    time: "1 hour ago",
    icon: CalendarDays,
    color: "text-blue-500 bg-blue-500/10",
    unread: true,
  },
  {
    id: 3,
    title: "Welcome to PlanDa!",
    description: "Your workspace is ready to use.",
    time: "Yesterday",
    icon: Info,
    color: "text-yellow-500 bg-yellow-500/10",
    unread: false,
  },
];

export default function Notification() {
  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="icon" className="relative" />}
      >
        <Bell className="h-[1.2rem] w-[1.2rem]" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white ring-2 ring-background">
            {unreadCount}
          </span>
        )}

        <span className="sr-only">Notifications</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[360px] p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-base font-semibold">Notifications</h3>

          <span className="text-xs text-muted-foreground">
            {unreadCount} unread
          </span>
        </div>

        <DropdownMenuSeparator />

        {/* Notification list */}
        <div className="max-h-[380px] overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notification.icon;

            return (
              <DropdownMenuItem
                key={notification.id}
                className="flex cursor-pointer items-start gap-3 rounded-none px-4 py-3 focus:bg-accent"
              >
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${notification.color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{notification.title}</p>

                    {notification.unread && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>

                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {notification.description}
                  </p>

                  <p className="text-[11px] text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator />

        {/* Footer */}
        <div className="p-2">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            <Check className="mr-2 h-3.5 w-3.5" />
            Mark all as read
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
