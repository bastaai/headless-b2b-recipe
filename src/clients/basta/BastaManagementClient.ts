import { BidderToken, ManagementSale } from "./models";
import axios from "axios";
import { IBastaManagementClient } from "./IBastaManagementClient";

const DEFAULT_EXPIRATION: number = 1440;

export class BastaManagementClient implements IBastaManagementClient {
  private readonly apiURI: string;
  private readonly key: string;
  private readonly accountID: string;

  constructor(apiURI: string, key: string, accountID: string) {
    this.apiURI = apiURI;
    this.key = key;
    this.accountID = accountID;
  }

  async genenerateBiddersToken(userID: string): Promise<BidderToken> {
    const graphqlQuery = {
      query: `
        mutation GetBiddersToken {
          createBidderToken(accountId: "${this.accountID}", input: { metadata: { userId: "${userID}", ttl: ${DEFAULT_EXPIRATION}}}) {
            token
            expiration
          }
        }`,
    };

    if (!this.apiURI) {
      throw new Error("API url is not defined for fetching bidders token");
    }

    try {
      const tokenPayload = await axios.post<{
        data: {
          createBidderToken: BidderToken;
        };
        errors: any;
      }>(this.apiURI, graphqlQuery, {
        headers: {
          "x-account-id": this.accountID,
          "x-api-key": this.key,
          "content-type": "application/json",
        },
      });
      return tokenPayload.data.data.createBidderToken;
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async getSale(saleID: string): Promise<ManagementSale> {
    const graphqlQuery = {
      query: `
        query GetSale{
          sale(
            accountId: "${this.accountID}",
            id: "${saleID}"
          ) {
            id
            items {
              edges {
                cursor
                node {
                  id
                  bids {
                    amount
                    date
                    bidStatus
                    userId
                    date
                    maxAmount
                  }
                }
              }
            }
          }
        }
      `,
    };

    if (!this.apiURI) {
      throw new Error("API url is not defined for fetching bidders token");
    }
    try {
      const salePayload = await axios.post<{
        data: {
          sale: ManagementSale;
        };
      }>(this.apiURI, graphqlQuery, {
        headers: {
          "x-account-id": this.accountID,
          "x-api-key": this.key,
          "content-type": "application/json",
        },
      });
      return salePayload.data.data.sale;
    } catch (error) {
      throw new Error(error as any);
    }
  }
}
