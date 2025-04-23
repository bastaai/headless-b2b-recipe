import { request, RequestExtendedOptions, Variables } from "graphql-request";
import { saleQuery, MAX_BID_ON_ITEM, salesQuery } from "../queries/sale";
import {
  Get_SaleQuery,
  Get_SaleQueryVariables,
  Get_SalesQuery,
  Get_SalesQueryVariables,
  MaxBidOnItemMutation,
  MaxBidOnItemMutationVariables,
} from "../types/graphql";

// getSale fetches sale from client basta GraphQL client api.
export async function getSale(
  saleId: string,
  token: string | null
): Promise<Get_SaleQuery["sale"]> {
  const data = await makeRequest<Get_SaleQuery, Get_SaleQueryVariables>(
    saleQuery,
    {
      saleId,
    },
    token,
    process.env.NEXT_PUBLIC_BASTA_CLIENT_API_URL || ""
  );

  return data.sale;
}

export async function getSales(
  accountId: string,
  token: string | null
): Promise<Get_SalesQuery["sales"]["edges"]> {
  const data = await makeRequest<Get_SalesQuery, Get_SalesQueryVariables>(
    salesQuery,
    {
      accountId,
    },
    token,
    process.env.NEXT_PUBLIC_BASTA_CLIENT_API_URL || ""
  );

  return data.sales.edges;
}

export async function placeMaxBid(
  saleId: string,
  itemId: string,
  token: string | null,
  maxAmount: number
): Promise<MaxBidOnItemMutation> {
  const variables = {
    saleId,
    itemId,
    maxAmount,
  };
  const data = await makeRequest<
    MaxBidOnItemMutation,
    MaxBidOnItemMutationVariables
  >(
    MAX_BID_ON_ITEM,
    variables,
    token,
    process.env.NEXT_PUBLIC_BASTA_CLIENT_API_URL || ""
  );

  return data;
}

// generic function for fetching graphql queries from any graphql server.
export function makeRequest<T, V extends Variables>(
  query: string,
  variables: V,
  token: string | null,
  url: string
): Promise<T> {
  const requestConfig: RequestExtendedOptions = {
    url: url,
    document: query,
    variables: variables,
  };

  if (token) {
    requestConfig.requestHeaders = {
      authorization: `Bearer ${token}`,
    };
  }

  return request<T>(requestConfig);
}
