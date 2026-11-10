import NavigationMenu from "./navigation-menu";
import { DashboardUser } from "./finance/dashboard-user";
import Logo from "../common/logo";

interface DashboardHeaderProps {
  user: User | null;
}
export function DashboardSidebar({ user }: DashboardHeaderProps) {
  return (
    <aside className="hidden w-full max-w-64 min-h-full shrink-0 border-r bg-[#14201B] py-7 px-5 text-white md:flex  md:flex-col">
      {/* Logo */}
      <Logo />
      {/* Main navigation */}
      <NavigationMenu />
      {/* User Profile */}
      <DashboardUser user={user} />
    </aside>
  );
}
