import { gql } from "@apollo/client";

export const CREATE_UPLOAD_URL_MUTATION = gql`
  mutation CreateUploadUrl($input: CreateUploadUrlInput!) {
    createUploadUrl(input: $input) {
      key
      uploadUrl
    }
  }
`;
