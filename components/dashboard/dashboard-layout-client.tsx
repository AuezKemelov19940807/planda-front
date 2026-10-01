"use client";

import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import Cookies from "js-cookie";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ME_QUERY } from "@/graphql/queries/me";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "@/i18n/navigation";

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
      <DashboardHeader user={user} />

      {/* Body */}
      <div className="flex flex-1">
        <DashboardSidebar />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
