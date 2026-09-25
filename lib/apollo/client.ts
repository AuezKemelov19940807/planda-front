// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export const apolloClient = new ApolloClient({
//   link: new HttpLink({
//     uri: `${API_URL}/graphql`,
//     credentials: "include",
//   }),

//   cache: new InMemoryCache(),
// });

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("access_token");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
