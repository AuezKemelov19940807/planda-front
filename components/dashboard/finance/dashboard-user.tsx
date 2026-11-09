"use clent";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  CircleUserRound,
  Link,
  UserIcon,
  Settings,
  LogOut,
} from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { LOGOUT_MUTATION } from "@/graphql/mutations/logout";
import { useMutation } from "@apollo/client/react";
import { useAuthStore } from "@/stores/auth-store";
import Cookies from "js-cookie";

interface DashboardHeaderProps {
  user: User | null;
}

export function DashboardUser({ user }: DashboardHeaderProps) {
  const router = useRouter();

  const [logOut, { loading }] = useMutation(LOGOUT_MUTATION);

  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await logOut();

      clearUser();

      Cookies.remove("access_token", {
        path: "/",
      });

      router.replace("/auth/login");
    } catch {
      // Ошибка обрабатывается Apollo
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={loading}
        className="inline-flex h-10 items-center gap-2 rounded-md px-2 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name ?? user.email}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <CircleUserRound className="h-8 w-8" />
        )}

        <span className="hidden md:block">
          {user?.name ?? user?.email ?? "Пользователь"}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <Link className="flex items-center ml-1" href="/dashboard/profile">
          <UserIcon className="mr-2 h-4 w-4" />
          Профиль
        </Link>

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
  );
}
