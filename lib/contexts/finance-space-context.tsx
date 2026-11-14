"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import { FinanceSpaceType } from "@/graphql/types/financeSpaces";

interface FinanceSpaceContextType {
  selectedSpace: FinanceSpaceType | null;
  setSelectedSpace: (space: FinanceSpaceType) => void;
}

const FinanceSpaceContext = createContext<FinanceSpaceContextType | null>(null);

export function FinanceSpaceProvider({ children }: { children: ReactNode }) {
  const [selectedSpace, setSelectedSpace] = useState<FinanceSpaceType | null>(
    null,
  );

  return (
    <FinanceSpaceContext.Provider value={{ selectedSpace, setSelectedSpace }}>
      {children}
    </FinanceSpaceContext.Provider>
  );
}

export function useFinanceSpace() {
  const context = useContext(FinanceSpaceContext);

  if (!context) {
    throw new Error("useFinanceSpace must be used inside FinanceSpaceProvider");
  }

  return context;
}
