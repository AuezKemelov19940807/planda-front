"use client";
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { useState } from "react";

import TransactionForm from "./transaction-form";
import TransactionTypeCard from "./transaction-type-card";
import DividerFinance from "./divider-finance";
type TransactionType = "income" | "expense";

interface ModalContentProps {
  onClose: () => void;
  initialType: TransactionType;
}

export function TransactionModalContent({
  onClose,
  initialType,
}: ModalContentProps) {
  const [type, setType] = useState<TransactionType>(initialType);
  return (
    <>
      <X className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />

      <h2 className="text-xl font-semibold">Что хотите добавить?</h2>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <TransactionTypeCard
          title="Доход"
          description="Полученные деньги"
          value="income"
          selected={type}
          onClick={() => setType("income")}
          color="green"
          Icon={ArrowDown}
        />

        <TransactionTypeCard
          title="Расход"
          description="Потраченные деньги"
          value="expense"
          selected={type}
          onClick={() => setType("expense")}
          color="red"
          Icon={ArrowUp}
        />
      </div>

      <DividerFinance type={initialType} />

      <TransactionForm type={initialType} />
    </>
  );
}
