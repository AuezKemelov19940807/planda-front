"use client";

import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import Cookies from "js-cookie";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ME_QUERY } from "@/graphql/queries/me";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "@/i18n/navigation";
import { ModeToggle } from "../common/mode-toggle";
import { LangToggle } from "../common/lang-toggle";
import { Bell } from "lucide-react";
import Notification from "../common/notification";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
      return;
    }

    if (!loading && error) {
      clearUser();

      Cookies.remove("access_token", {
        path: "/",
      });

      router.replace("/auth/login");
    }
  }, [data, loading, error, setUser, clearUser, router]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      {/* <DashboardHeader user={user} /> */}

      {/* Body */}
      <div className="flex flex-1">
        <DashboardSidebar user={user} />
        <div className="p-10 w-full">
          <div className="pb-7 flex items-end gap-x-3 justify-end">
            <ModeToggle />
            <Notification />
            <LangToggle />
          </div>

          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
