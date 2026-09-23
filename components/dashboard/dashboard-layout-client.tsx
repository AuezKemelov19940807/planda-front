"use client";

import { useQuery } from "@apollo/client/react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ME_QUERY } from "@/graphql/queries/me";

interface User {
  id: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
}

interface MeQuery {
  me: User | null;
}

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY, {
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Загрузка...
      </div>
    );
  }

  if (error) {
    console.error("ME_QUERY ERROR:", error);

    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-destructive">
          Не удалось загрузить пользователя.
        </p>
      </div>
    );
  }

  if (!data?.me) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Пользователь не авторизован.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader user={data.me} />

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
