export type BidderToken = {
  token: string;
  expiration: string;
};

export enum BidStatus {
  /* User is losing the item. */
  Losing = "LOSING",
  /* User has lost the item. */
  Lost = "LOST",
  /* User is not bidding on the item */
  NotBidding = "NOT_BIDDING",
  /* User is winning the item. */
  Winning = "WINNING",
  /* User has won the item. */
  Won = "WON",
}

export type Bid = {
  amount: number;
  maxAmount?: number;
  bidStatus?: BidStatus;
  date: string;
  userId: string;
};

export type Item = {
  id: string;
  bids: Array<Bid>;
};

export type ItemsEdge = {
  node: Item;
};

export type ItemsConnection = {
  edges: Array<ItemsEdge>;
};

export type ManagementSale = {
  id: string;
  items: ItemsConnection;
};
