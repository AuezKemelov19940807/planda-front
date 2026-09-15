import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${API_URL}/graphql`,
    credentials: "include",
  }),

  cache: new InMemoryCache(),
});
