import Finance from "@/components/dashboard/finance/finance";
import { FINANCE_SPACES } from "@/graphql/queries/finance/queries/financeSpaces";
import { FinanceSpaceType } from "@/graphql/types/financeSpaces";
import { useQuery } from "@apollo/client/react";
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
