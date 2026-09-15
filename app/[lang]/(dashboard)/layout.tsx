import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardLayoutClient } from "@/components/dashboard/dashboard-layout-client";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
