"use client";
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import TransactionForm from "./transaction-form";
import TransactionTypeCard from "./transaction-type-card";
import DividerFinance from "./divider-finance";
import { div } from "framer-motion/client";
type TransactionType = "income" | "expense";

interface ModalContentProps {
  onClose: () => void;
  transactionType: TransactionType;
  setTransactionType: Dispatch<SetStateAction<TransactionType>>;
  modalMode: "select" | "direct";
}

export function TransactionModalContent({
  onClose,
  transactionType,
  setTransactionType,
  modalMode,
}: ModalContentProps) {
  return (
    <>
      <X className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />

      <h2 className="text-xl font-semibold">
        {modalMode === "direct"
          ? transactionType === "income"
            ? "Добавить доход"
            : "Добавить расход"
          : "Что хотите добавить?"}
      </h2>

      {modalMode === "select" && (
        <div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <TransactionTypeCard
              title="Доход"
              description="Полученные деньги"
              value="income"
              transactionType={transactionType}
              onClick={() => setTransactionType("income")}
              color="green"
              Icon={ArrowDown}
            />

            <TransactionTypeCard
              title="Расход"
              description="Потраченные деньги"
              value="expense"
              transactionType={transactionType}
              onClick={() => setTransactionType("expense")}
              color="red"
              Icon={ArrowUp}
            />
          </div>
          <DividerFinance transactionType={transactionType} />
        </div>
      )}

      <TransactionForm transactionType={transactionType} />
    </>
  );
}
