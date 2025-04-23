export type BidOnItemWebhookResponse = {
  success: boolean;
  message: string;
};

export type BastaBidOnItemActionBody = {
  idempotencyKey: string;
  actionType: string;
  data: {
    saleId: string;
    itemId: string;
    userId: string;
    amount: number;
    maxAmount: number;
    bidDate: string;
    saleState: {
      newLeader: string;
      prevLeader: string;
      currentBid: number;
      currentMaxBid: number;
    };
    reactiveBids: ReactiveBid[];
  };
};

export type ItemStatusChangedActionBody = {
  idempotencyKey: string;
  actionType: string;
  data: {
    saleId: string;
    itemStatusChanges: ItemStatus[];
  };
};

export type ItemStatus = {
  itemId: string;
  itemStatus: string;
  saleState: {
    newLeader: string;
    prevLeader: string;
    currentBid: number;
    currentMaxBid: number;
  };
};

export type ReactiveBid = {
  bidId: string;
  userId: string;
  amount: number;
  maxAmount: number;
};
