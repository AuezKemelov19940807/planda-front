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
  me: User;
}

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading } = useQuery<MeQuery>(ME_QUERY);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Загрузка...
      </div>
    );
  }

  if (!data?.me) {
    return null;
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
