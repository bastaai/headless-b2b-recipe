import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createClient, ClientOptions } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { isBrowser } from "../utils/environment";

export function getApolloClient(token: string | null) {
  const clientConfig: ClientOptions = {
    url: process.env.NEXT_PUBLIC_BASTA_WSS_URL || "",
  };

  if (token) {
    clientConfig.connectionParams = {
      token: token,
    };
  }

  const wsLink = isBrowser()
    ? new GraphQLWsLink(createClient(clientConfig))
    : undefined;

  const appolloClient = new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  return appolloClient;
}
