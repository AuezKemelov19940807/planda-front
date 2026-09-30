import { gql } from "@apollo/client";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($payload: UpdateUserDto!) {
    updateUser(payload: $payload) {
      id
      email
      name
      avatar
    }
  }
`;
