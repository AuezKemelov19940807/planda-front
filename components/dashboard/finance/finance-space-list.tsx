"use client";
import { useEffect, useState } from "react";
import { FINANCE_SPACES } from "@/graphql/queries/finance/queries/financeSpaces";
import { FinanceSpaceResponseType } from "@/graphql/types/financeSpaces";
import { useQuery } from "@apollo/client/react";
import FinanceSpaceItem from "./finance-space-item";
import { useFinanceSpace } from "@/lib/contexts/finance-space-context";

export default function FinanceSpaceList() {
  const { data, loading, error } = useQuery<FinanceSpaceResponseType>(
    FINANCE_SPACES,
    {
      fetchPolicy: "network-only",
    },
  );

  const spaceItems = data?.financeSpaces ?? [];
  const { selectedSpace, setSelectedSpace } = useFinanceSpace();
  useEffect(() => {
    if (!selectedSpace && spaceItems.length > 0) {
      setSelectedSpace(spaceItems[0]);
    }
  }, [spaceItems, selectedSpace, setSelectedSpace]);

  if (loading) {
    return <p>Загрузка финансов...</p>;
  }

  if (error) {
    return <p>Не удалось загрузить финансовые пространства.</p>;
  }

  return (
    <div className="flex items-center gap-x-2.5">
      {spaceItems.map((spaceItem) => (
        <FinanceSpaceItem key={spaceItem.id} spaceItem={spaceItem} />
      ))}
    </div>
  );
}
