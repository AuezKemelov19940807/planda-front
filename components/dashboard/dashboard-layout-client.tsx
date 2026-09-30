"use client";

import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import Cookies from "js-cookie";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ME_QUERY } from "@/graphql/queries/me";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "@/i18n/navigation";

interface MeQuery {
  me: {
    id: string;
    email: string;
    name?: string | null;
    avatar?: string | null;
  } | null;
}

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
    <div className="min-h-screen">
      <DashboardHeader user={user} />

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
