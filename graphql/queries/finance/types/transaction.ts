export type TransactionType = "INCOME" | "EXPENSE";

export interface TransactionTypeProps {
  type: TransactionType;
}

export interface TransactionProps {
  id: string;
  amount: number;
  date: string;
  financeSpaceId: string;
  type: TransactionType;
  comment: string | null;
}

export interface TransactionsResponse {
  transactions: TransactionProps[];
}
