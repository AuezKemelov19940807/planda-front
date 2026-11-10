import { gql } from "@apollo/client";

export const TRANSACTIONS = gql`
  query Transactions($financeSpaceId: ID!) {
    transactions(financeSpaceId: $financeSpaceId) {
      id
      amount
      date
      financeSpaceId
      type
      comment
    }
  }
`;
