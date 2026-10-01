import { gql } from "@apollo/client";
export const SIGN_UP = gql`
  mutation SignUp(
    $name: String!
    $email: String!
    $password: String!
    $avatar: String
  ) {
    signUp(
      payload: {
        name: $name
        email: $email
        password: $password
        avatar: $avatar
      }
    ) {
      id
      name
      email
      avatar
    }
  }
`;
