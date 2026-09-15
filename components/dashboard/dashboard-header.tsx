"use client";

import { useMutation } from "@apollo/client/react";
import { Bell, CircleUserRound, LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { useRouter } from "@/i18n/navigation";
import { LOGOUT_MUTATION } from "@/graphql/mutations/logout";

interface User {
  id: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
}

interface DashboardHeaderProps {
  user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter();

  const [logOut, { loading }] = useMutation(LOGOUT_MUTATION);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/auth/login");
    } catch {
      // Ошибка обрабатывается Apollo
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
      <h1 className="text-lg font-semibold">Обзор</h1>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" aria-label="Уведомления">
          <Bell className="h-5 w-5" />
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={loading}
            className="inline-flex h-10 items-center gap-2 rounded-md px-2 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name ?? user.email}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <CircleUserRound className="h-8 w-8" />
            )}

            <span className="hidden md:block">{user.name ?? user.email}</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Профиль
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Настройки
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              disabled={loading}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {loading ? "Выход..." : "Выйти"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
