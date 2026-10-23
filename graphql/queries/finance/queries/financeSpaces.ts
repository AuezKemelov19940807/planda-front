import { gql } from "@apollo/client";

export const FINANCE_SPACES = gql`
  query FinanceSpaces {
    financeSpaces {
      id
      name
    }
  }
`;
