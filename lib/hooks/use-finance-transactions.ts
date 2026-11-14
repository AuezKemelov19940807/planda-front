"use client";

import { useQuery } from "@apollo/client/react";

import { TRANSACTIONS } from "@/graphql/queries/finance/queries/transactions";
import { TransactionsResponse } from "@/graphql/queries/finance/types/transaction";
import { useFinanceSpace } from "../contexts/finance-space-context";

export function useFinanceTransactions() {
  const { selectedSpace } = useFinanceSpace();

  return useQuery<TransactionsResponse>(TRANSACTIONS, {
    variables: {
      financeSpaceId: selectedSpace?.id ?? "",
    },
    skip: !selectedSpace?.id,
  });
}
