import { gql } from "@apollo/client";

export const CREATE_FINANCE_SPACE = gql`
  mutation CreateFinanceSpace($input: CreateFinanceSpaceDto!) {
    createFinanceSpace(input: $input) {
      id
      name
      isDefault
    }
  }
`;
