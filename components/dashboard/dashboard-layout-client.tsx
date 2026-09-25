"use client";

import { useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ME_QUERY } from "@/graphql/queries/me";
import { useRouter } from "@/i18n/navigation";

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
  const router = useRouter();

  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!loading && (error || !data?.me)) {
      router.replace("/auth/login");
    }
  }, [loading, error, data, router]);

  if (error || (!loading && !data?.me)) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader user={data?.me ?? null} />

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}