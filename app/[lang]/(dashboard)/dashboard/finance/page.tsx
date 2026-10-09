import Finance from "@/components/dashboard/finance/finance";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Финансы",
  description: "Управление доходами и расходами",
};
export default function FinancePage() {
  return (
    <div className="p-4 md:p-6">
      <Finance />
    </div>
  );
}
