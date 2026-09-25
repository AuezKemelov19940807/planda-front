import { gql } from "@apollo/client";

export const GOOGLE_SIGN_IN = gql`
  mutation GoogleSignIn($credential: String!) {
    googleSignIn(credential: $credential) {
      id
      email
      name
      avatar
      access_token
    }
  }
`;
