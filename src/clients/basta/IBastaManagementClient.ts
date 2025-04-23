import { BidderToken, ManagementSale } from "./models";

export interface IBastaManagementClient {
  genenerateBiddersToken(userID: string): Promise<BidderToken>;
  getSale(saleID: string): Promise<ManagementSale>;
}
