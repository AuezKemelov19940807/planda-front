export interface FinanceSpaceResponseType {
  financeSpaces: FinanceSpaceType[];
}

export interface FinanceSpaceType {
  id: string;
  name: string;
  slug: string;
}

export type CreateFinanceSpaceResponse = {
  createFinanceSpace: FinanceSpaceType;
};

export type CreateFinanceSpaceVariables = {
  input: {
    name: string;
  };
};
