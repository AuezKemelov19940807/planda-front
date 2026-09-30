import { gql } from "@apollo/client";

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($payload: ChangePasswordDto!) {
    changePassword(payload: $payload) {
      id
      email
      name
      avatar
    }
  }
`;
