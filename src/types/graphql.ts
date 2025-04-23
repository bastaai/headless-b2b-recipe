export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  /** Indicates whether account is using basta's bid client */
  bastaBidClient: Scalars['Boolean'];
  /** Description for account */
  description?: Maybe<Scalars['String']>;
  /** Account handle, identifier for the account */
  handle?: Maybe<Scalars['String']>;
  /** ID of the account */
  id: Scalars['ID'];
  /** Url for the profile image */
  imageUrl?: Maybe<Scalars['String']>;
  /**
   * Is logged-in user subscribed to account ?
   * Only applies to sales running on basta.app (false for all api clients)
   */
  isUserSubscribed: Scalars['Boolean'];
  /** Links associated with account */
  links: Array<Link>;
  /** Name associated with account */
  name: Scalars['String'];
  /** PaymentDetails set by account */
  paymentDetails?: Maybe<PaymentDetails>;
};

export type BastaLiveStream = {
  __typename?: 'BastaLiveStream';
  /** LiveStream channel ID */
  channelId?: Maybe<Scalars['String']>;
  /** Current viewers */
  currentViewers?: Maybe<Scalars['Int']>;
  /** Is live stream enabled */
  enabled: Scalars['Boolean'];
  /** Is stream live */
  isLive: Scalars['Boolean'];
  /** LiveStream URL */
  publicUrl?: Maybe<Scalars['String']>;
};

/** Bid represents a bid that has been placed. */
export type Bid = {
  __typename?: 'Bid';
  /** Amount of bid in minor currency unit. */
  amount: Scalars['Int'];
  /** Bid status of for the bid */
  bidStatus?: Maybe<BidStatus>;
  /**
   * User Identifier.
   * Controlled in ManagementAPI for the SaleItem owning the bid.
   * Can be userID, randomIdentifier or null.
   * Default null
   */
  bidderIdentifier?: Maybe<Scalars['String']>;
  /** Date of when the bid was placed. */
  date: Scalars['String'];
  /** Bid ID */
  id: Scalars['ID'];
  /** Id of the item */
  itemId: Scalars['String'];
  /** Max amount placed with the bid in minor currency unit. */
  maxAmount?: Maybe<Scalars['Int']>;
  /** Optional paddle if bid is associated with a paddle. */
  paddle?: Maybe<Paddle>;
  /** Id of the sale */
  saleId: Scalars['String'];
};

/** Error code when failing to place a bid on an item */
export enum BidErrorCode {
  AlreadyHigherMaxBid = 'ALREADY_HIGHER_MAX_BID',
  BidAmountUpperLimitReached = 'BID_AMOUNT_UPPER_LIMIT_REACHED',
  BidLowerThanCurrentBid = 'BID_LOWER_THAN_CURRENT_BID',
  BidLowerThanCurrentMax = 'BID_LOWER_THAN_CURRENT_MAX',
  InternalError = 'INTERNAL_ERROR',
  ItemAlreadyClosed = 'ITEM_ALREADY_CLOSED',
  ItemClosingPeriodPassed = 'ITEM_CLOSING_PERIOD_PASSED',
  MaxBidLowerThanCurrentMax = 'MAX_BID_LOWER_THAN_CURRENT_MAX',
  NotOpenForBidding = 'NOT_OPEN_FOR_BIDDING',
  NoError = 'NO_ERROR',
  OffIncrement = 'OFF_INCREMENT',
  StartingBidHigher = 'STARTING_BID_HIGHER'
}

/**
 * Bid increment table represent how increments behave for a
 * specific item or an sale.
 */
export type BidIncrementTable = {
  __typename?: 'BidIncrementTable';
  /** Range rules in the table. */
  rangeRules: Array<RangeRule>;
};

export type BidPlaced = BidPlacedError | BidPlacedSuccess | MaxBidPlacedSuccess;

export type BidPlacedError = {
  __typename?: 'BidPlacedError';
  /** Error description if an error occured. */
  error: Scalars['String'];
  /** Error code if an error occured */
  errorCode: BidErrorCode;
};

/**
 * Bid is placed response.
 * Error will only appear if there was an error placing a bid, such as off increment etc.
 */
export type BidPlacedSuccess = {
  __typename?: 'BidPlacedSuccess';
  /** Amount of placed bid. */
  amount: Scalars['Int'];
  /** Bid Status of the bid */
  bidStatus: BidStatus;
  /** Server time of when the bid was placed. */
  date: Scalars['String'];
  /** bidId */
  id: Scalars['String'];
};

/** Bid statuses that calculates in what status the bid is. */
export enum BidStatus {
  /** User is losing the item. */
  Losing = 'LOSING',
  /** User has lost the item. */
  Lost = 'LOST',
  /** User is not bidding on the item. */
  NotBidding = 'NOT_BIDDING',
  /** User has submitted an offer for the item. */
  Submitted = 'SUBMITTED',
  /** User is winning the item. */
  Winning = 'WINNING',
  /** User has withdrawn an offer for the item. */
  Withdrawn = 'WITHDRAWN',
  /** User has won the item. */
  Won = 'WON'
}

/** Bid Type represent what kind of bid is being placed on an item. */
export enum BidType {
  /**
   * Bid is the highest amount a user is willing to pay. The auction
   * engine will automatically place the lowest bid necessary on behalf
   * of the user until the max amount is reached.
   */
  Max = 'MAX',
  /** Bid is a normal bid. */
  Normal = 'NORMAL',
  /** Bid is an offer that the user commits to buying the item for. */
  Offer = 'OFFER'
}

export type BidderVerificationInput = {
  /** failed verification or if session is left wil send user to the cancelUrl */
  cancelUrl: Scalars['String'];
  /** successful verification is redirected to this url */
  successUrl: Scalars['String'];
};

export type BidderVerificationLink = {
  __typename?: 'BidderVerificationLink';
  /** Redirection link to verification url */
  url: Scalars['String'];
};

/** ClosingMethod represents how SaleItems are moved into CLOSING status and when they are CLOSED */
export enum ClosingMethod {
  /**
   * No sniping.
   * All items close at the same time as the sale
   */
  None = 'NONE',
  /**
   * Only one item is in status CLOSING at a time.
   * Other items wait in status OPEN.
   * @deprecated use OVERLAPPING, will be removed in the near future
   */
  OneByOne = 'ONE_BY_ONE',
  /**
   * Each item has a precalculated closing time.
   * Items may be in closing at the same time.
   */
  Overlapping = 'OVERLAPPING'
}

export type Estimate = {
  __typename?: 'Estimate';
  /** Item high estimate */
  high?: Maybe<Scalars['Int']>;
  /** Item low estimate */
  low?: Maybe<Scalars['Int']>;
};

export type ExternalLiveStream = {
  __typename?: 'ExternalLiveStream';
  /** LiveStream Created */
  created: Scalars['String'];
  /** LiveStream Title */
  type: LiveStreamType;
  /** LiveStream Updated */
  updated: Scalars['String'];
  /** LiveStream URL */
  url: Scalars['String'];
};

/** Input parameters to get all bids for userId */
export type GetUserBidsInput = {
  __typename?: 'GetUserBidsInput';
  after?: Maybe<Scalars['String']>;
  first: Scalars['Int'];
  userId: Scalars['String'];
};

export enum IdType {
  Id = 'ID',
  Uri = 'URI'
}

/** Image object */
export type Image = {
  __typename?: 'Image';
  /** ID of the image, UUID string */
  id: Scalars['String'];
  /** DisplayOrder for image */
  order: Scalars['Int'];
  /** Image URL */
  url: Scalars['String'];
};

/** An item (can be associcated with a sale or not) */
export type Item = Node & {
  __typename?: 'Item';
  /** The id of the account that this item is associated to. */
  accountId: Scalars['String'];
  /** Bid status of currently logged in user for this item */
  bidStatus?: Maybe<BidStatus>;
  /**
   * Get list of bids for this item.
   * Filters:
   *   - collapseSequentialUserBids: Collapses multiple sequential bids from same user to a single bid (only the newest one is then returned).
   */
  bids: Array<Bid>;
  /** Current bid amount for the item in minor currency unit. */
  currentBid?: Maybe<Scalars['Int']>;
  /** Item cursor is used in pagination. */
  cursor: Scalars['String'];
  /** Closing start and end timestamps if the item is closing */
  dates?: Maybe<ItemDates>;
  /** Item Description */
  description?: Maybe<Scalars['String']>;
  /** Item estimate in minor currency unit. */
  estimates: Estimate;
  /** Id of an item. */
  id: Scalars['ID'];
  /** Images attached to sale */
  images: Array<Image>;
  /** Overridden increment table for the item. */
  incrementTable?: Maybe<BidIncrementTable>;
  /**
   * Is logged-in user subscribed to item ?
   * Only applies to sales running on basta.app (false for all api clients)
   */
  isUserSubscribed: Scalars['Boolean'];
  /**
   * DEPRECATED.
   * Closing timestamp if the item is closing
   * @deprecated itemDates is deprecated. Use dates instead.
   */
  itemDates?: Maybe<ItemDates>;
  /** Item number */
  itemNumber: Scalars['Int'];
  /** Next 10 asks for the item in minor currency unit. */
  nextAsks: Array<Scalars['Int']>;
  /** Item notifications if item is part of a live sale */
  notifications: Array<ItemNotification>;
  /**
   * Was there an accepted bid that met the reserve price
   * @deprecated use reserveStatus instead
   */
  reserveMet: Scalars['Boolean'];
  /** Reserve status. */
  reserveStatus: ReserveStatus;
  /** The id of the sale that this item is associated to. */
  saleId: Scalars['String'];
  /**
   * Slug identifier for item.
   * Null/empty for integrating applications.
   */
  slug?: Maybe<Scalars['String']>;
  /** Starting bid of the item in minor currency unit. */
  startingBid?: Maybe<Scalars['Int']>;
  /** Status of the item */
  status: ItemStatus;
  /** Item title */
  title?: Maybe<Scalars['String']>;
  /** Number of bids that have been placed on the item */
  totalBids: Scalars['Int'];
  /** Get list of bids for this item that is placed by the logged in user. */
  userBids: Array<Bid>;
};


/** An item (can be associcated with a sale or not) */
export type ItemBidsArgs = {
  collapseSequentialUserBids?: InputMaybe<Scalars['Boolean']>;
};


/** An item (can be associcated with a sale or not) */
export type ItemNextAsksArgs = {
  iterations?: InputMaybe<Scalars['Int']>;
};

export type ItemChanged = Item | ServerTime;

export type ItemDates = {
  __typename?: 'ItemDates';
  closingEnd?: Maybe<Scalars['String']>;
  closingStart?: Maybe<Scalars['String']>;
  openDate?: Maybe<Scalars['String']>;
};

export type ItemFairWarningNotification = {
  __typename?: 'ItemFairWarningNotification';
  /**
   * Date timestamp when message was created.
   * RFC3339 formatted string
   */
  date: Scalars['String'];
  /** Id of the notification */
  id: Scalars['String'];
};

export type ItemMessageNotification = {
  __typename?: 'ItemMessageNotification';
  /**
   * Date timestamp when message was created.
   * RFC3339 formatted string
   */
  date: Scalars['String'];
  /** Id of the notification */
  id: Scalars['String'];
  /** Message */
  message: Scalars['String'];
};

export type ItemNotification = ItemFairWarningNotification | ItemMessageNotification;

export enum ItemOrderField {
  /** Created date */
  Created = 'CREATED',
  /** Item Number */
  ItemNumber = 'ITEM_NUMBER'
}

export type ItemOrderInput = {
  /** Order direction */
  direction?: PaginationDirection;
  /** Field to order by */
  field?: ItemOrderField;
};

/** Item statuses for items in a sale */
export enum ItemStatus {
  ItemClosed = 'ITEM_CLOSED',
  ItemClosing = 'ITEM_CLOSING',
  ItemLive = 'ITEM_LIVE',
  ItemNotOpen = 'ITEM_NOT_OPEN',
  ItemOpen = 'ITEM_OPEN',
  ItemPaused = 'ITEM_PAUSED',
  ItemProcessing = 'ITEM_PROCESSING'
}

export type ItemsConnection = {
  __typename?: 'ItemsConnection';
  /** Item edges */
  edges: Array<ItemsEdge>;
  /** Current page information */
  pageInfo: PageInfo;
};

export type ItemsEdge = {
  __typename?: 'ItemsEdge';
  /** Current item cursor */
  cursor: Scalars['String'];
  /** Item node */
  node: Item;
};

export type Link = {
  __typename?: 'Link';
  type: LinkType;
  url: Scalars['String'];
};

export enum LinkType {
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  Tiktok = 'TIKTOK',
  Website = 'WEBSITE',
  X = 'X',
  Youtube = 'YOUTUBE'
}

/** Live Item represents an item that is currently being auctioned in a live sale. */
export type LiveItem = {
  __typename?: 'LiveItem';
  cursor: Scalars['String'];
  item: Item;
};

/** deprecated type remove when everything is migrated to LiveVideoStream */
export type LiveStream = {
  __typename?: 'LiveStream';
  /** LiveStream Created */
  created: Scalars['String'];
  /** LiveStream Title */
  type: LiveStreamType;
  /** LiveStream Updated */
  updated: Scalars['String'];
  /** LiveStream URL */
  url: Scalars['String'];
};

/** LiveStreamType represents the type of live stream */
export enum LiveStreamType {
  /** Amazon IVS live stream */
  AmazonIvs = 'AMAZON_IVS',
  /**
   * Basta live stream
   * Built-in live stream for Basta
   */
  BastaLive = 'BASTA_LIVE',
  /** Generic live stream */
  Generic = 'GENERIC',
  /** YouTube live stream */
  YouTubeLive = 'YouTubeLive'
}

export type LiveVideoStream = BastaLiveStream | ExternalLiveStream;

export type MaxBidPlaced = BidPlacedError | MaxBidPlacedSuccess;

/**
 * Bid is placed response.
 * Error will only appear if there was an error placing a bid, such as off increment etc.
 */
export type MaxBidPlacedSuccess = {
  __typename?: 'MaxBidPlacedSuccess';
  /** Current amount of placed bid in minor currency unit. */
  amount: Scalars['Int'];
  /** Bid Status of the bid */
  bidStatus: BidStatus;
  /** Server time of when the bid was placed. */
  date: Scalars['String'];
  /** bidId */
  id: Scalars['String'];
  /** Max amount of placed bid in minor currency unit. */
  maxAmount: Scalars['Int'];
};

/** Me object keeps information about the logged in user. */
export type Me = {
  __typename?: 'Me';
  /** Accounts for logged in user */
  accounts: Array<Account>;
  /** Get all bids that a user has placed on sales */
  bids: UserBidsConnection;
  /** Unique user id of the logged in user. */
  userId: Scalars['String'];
  /** True if logged in user is a verified Basta bidder */
  verifiedAsBidder: Scalars['Boolean'];
};


/** Me object keeps information about the logged in user. */
export type MeBidsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * AcceptBidderTerms.
   * This method is only available to basta users and front ends written by Basta.
   * Returns a RFC3339 timestamp of when bidder terms were accepted.
   */
  acceptBidderTerms: Scalars['String'];
  /**
   * Place bid on a item for some amount. Can be of type NORMAL, MAX and OFFER.
   * Amount will be the max amount when bid is of type MAX.
   */
  bidOnItem: BidPlaced;
  /**
   * CreateBidderVerification.
   * This method is only available to basta users and front ends written by Basta.
   */
  createBidderVerification: BidderVerificationLink;
  /**
   * DEPRECATED.
   * Use BidOnItem with type input = MAX.
   * Place max bid on a item for some amount.
   * @deprecated maxBidOnItem is deprecated. Use bidOnItem with type as MAX instead.
   */
  maxBidOnItem: MaxBidPlaced;
  /** Users with basta session can subscribe to creators running sales on basta.app. */
  subscribeToAccount: UserAccountSubscription;
  /** Users with basta session can subscribe to individual sale items running on basta.app. */
  subsribeToItem: UserSaleItemSubscription;
  /** Unsusbscribe from an account */
  unsubscribeFromAccount: Scalars['ID'];
  /** Unsubscribe from item */
  unsubscribeFromItem: Scalars['ID'];
};


export type MutationBidOnItemArgs = {
  amount: Scalars['Int'];
  itemId: Scalars['String'];
  saleId: Scalars['String'];
  type: BidType;
};


export type MutationCreateBidderVerificationArgs = {
  input?: InputMaybe<BidderVerificationInput>;
};


export type MutationMaxBidOnItemArgs = {
  itemId: Scalars['String'];
  maxAmount: Scalars['Int'];
  saleId: Scalars['String'];
};


export type MutationSubscribeToAccountArgs = {
  accountId: Scalars['String'];
};


export type MutationSubsribeToItemArgs = {
  itemId: Scalars['String'];
  saleId: Scalars['String'];
};


export type MutationUnsubscribeFromAccountArgs = {
  accountId: Scalars['String'];
};


export type MutationUnsubscribeFromItemArgs = {
  itemId: Scalars['String'];
  saleId: Scalars['String'];
};

export type Node = {
  /** Identification of the node. */
  id: Scalars['ID'];
};

/** Paddle represent a paddle in a sale */
export type Paddle = {
  __typename?: 'Paddle';
  /** Paddle created date */
  created: Scalars['String'];
  /** Paddle identifier */
  identifier: Scalars['String'];
  /** Paddle type */
  type: PaddleType;
};

/** PaddleType represents the type of paddle */
export enum PaddleType {
  InRoom = 'IN_ROOM',
  NotSet = 'NOT_SET',
  Online = 'ONLINE',
  Other = 'OTHER',
  Phone = 'PHONE'
}

/** Page info for pagination */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Ending cursor */
  endCursor: Scalars['ID'];
  /** Has next page */
  hasNextPage: Scalars['Boolean'];
  /** Starting cursor */
  startCursor: Scalars['ID'];
  /** Total records */
  totalRecords: Scalars['Int'];
};

/** Direction of pagination */
export enum PaginationDirection {
  /** Descending order */
  Backwards = 'BACKWARDS',
  /** Ascending order */
  Forward = 'FORWARD'
}

export type PaymentDetails = {
  __typename?: 'PaymentDetails';
  bidderPremium: Scalars['Float'];
};

export type PaymentSession = {
  __typename?: 'PaymentSession';
  /** PaymentSession status */
  status: PaymentSessionStatus;
  /** Redirection link to payment session url */
  url: Scalars['String'];
};

export type PaymentSessionInput = {
  /** Item identifier. */
  itemId: Scalars['String'];
  /** Sale identifier. */
  saleId: Scalars['String'];
};

export enum PaymentSessionStatus {
  /** Invoice has been paid. */
  Done = 'DONE',
  /** Invoice is ready to be paid. */
  Ready = 'READY',
  /** Invoice is being generated. */
  Waiting = 'WAITING'
}

export enum Permission {
  AccessPrivate = 'ACCESS_PRIVATE',
  BidOnItem = 'BID_ON_ITEM'
}

export type Query = {
  __typename?: 'Query';
  /** Get account information given an accountId */
  account: Account;
  /**
   * SaleItems for an account.
   * Defaults to 20 items if not specified.
   * Max allowed batch size is 50. Anything above that will be downgraded to 20 items.
   */
  accountSaleItems: ItemsConnection;
  /**
   * Get all bids that a user has placed on sales
   * @deprecated use me query
   */
  bids: UserBidsConnection;
  /** Get information about the logged in user. */
  me: Me;
  /** This method is only available to basta users and front ends written by Basta */
  paymentSession: PaymentSession;
  /** Get information about an sale. */
  sale: Sale;
  /** Get item information. */
  saleItem: Item;
  /** Get item information by URI. */
  saleItemByURI: Item;
  /** Get all sales that have been created. */
  sales: SaleConnection;
  /** Get current server time. */
  serverTime: ServerTime;
};


export type QueryAccountArgs = {
  id: Scalars['String'];
  idType?: InputMaybe<IdType>;
};


export type QueryAccountSaleItemsArgs = {
  accountId: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<SaleItemFilter>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryBidsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  userId: Scalars['String'];
};


export type QueryPaymentSessionArgs = {
  input?: InputMaybe<PaymentSessionInput>;
};


export type QuerySaleArgs = {
  id: Scalars['String'];
  idType?: InputMaybe<IdType>;
};


export type QuerySaleItemArgs = {
  itemId: Scalars['String'];
  saleId: Scalars['String'];
};


export type QuerySaleItemByUriArgs = {
  uri: Scalars['String'];
};


export type QuerySalesArgs = {
  accountId: Scalars['String'];
  after?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<SaleFilter>;
  first?: InputMaybe<Scalars['Int']>;
  idType?: InputMaybe<IdType>;
};

/**
 * Range rule explains increments in the table.
 * Each amount should be in its minor currency unit.
 * The range rule [highRange: $1000, lowRange: $0, step: $25] would be
 *   [highRange: 100000, lowRange: 0, step: 2500]
 */
export type RangeRule = {
  __typename?: 'RangeRule';
  /** High range of the rule */
  highRange: Scalars['Int'];
  /** Low range of the rule */
  lowRange: Scalars['Int'];
  /** Step of the rule */
  step: Scalars['Int'];
};

export enum ReserveStatus {
  /** Reserve has been met */
  Met = 'MET',
  /** Reserve has not been met */
  NotMet = 'NOT_MET',
  /** The item has no reserve */
  NoReserve = 'NO_RESERVE'
}

/** Sale */
export type Sale = Node & {
  __typename?: 'Sale';
  /** Account ID associated with the sale */
  accountId: Scalars['String'];
  /** Closing method. */
  closingMethod: ClosingMethod;
  /**
   * Currency of the sale (capital letters: EUR, USD, etc.)
   * This is the default currency.
   * Item currency overrides sale currency, at least one of them needs to be defined.
   */
  currency?: Maybe<Scalars['String']>;
  /** Sale cursor is used in pagination. */
  cursor: Scalars['String'];
  /** Sale Dates */
  dates: SaleDates;
  /** Sale Description */
  description?: Maybe<Scalars['String']>;
  /** Sale ID */
  id: Scalars['ID'];
  /** Images attached to sale */
  images: Array<Image>;
  /**
   * Default increment table for the sale.
   * If an increment table is associated with any items in the sale
   * this will be overidden.
   */
  incrementTable?: Maybe<BidIncrementTable>;
  /** Items that have been associated with this sale. */
  items: ItemsConnection;
  /** Live Item in the Sale (only applicable for live sales) */
  liveItem?: Maybe<LiveItem>;
  /**
   * Live stream for the sale
   * @deprecated use liveVideoStreams instead
   */
  liveStream?: Maybe<LiveStream>;
  /** Live stream for the sale */
  liveVideoStream?: Maybe<LiveVideoStream>;
  /** Sequence number of this sale. */
  sequenceNumber: Scalars['Int'];
  /**
   * Slug identifier for sale.
   * Null/empty for integrating applications.
   */
  slug?: Maybe<Scalars['String']>;
  /** Sale status. */
  status: SaleStatus;
  /**
   * Sale theme type.
   * Null/empty for integrating applications.
   */
  themeType?: Maybe<Scalars['Int']>;
  /** Sale Title */
  title?: Maybe<Scalars['String']>;
  /** Sale type. */
  type: SaleType;
};


/** Sale */
export type SaleItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<SaleItemFilter>;
  first?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ItemOrderInput>;
};

export type SaleActivity = Item | Sale;

export type SaleChanged = Sale | ServerTime;

export type SaleConnection = {
  __typename?: 'SaleConnection';
  /** Sale edges */
  edges: Array<SalesEdge>;
  /** Current page information */
  pageInfo: PageInfo;
};

/** Sale Dates */
export type SaleDates = {
  __typename?: 'SaleDates';
  /** Date of when the sale is supposed to be automatically closed. */
  closingDate?: Maybe<Scalars['String']>;
  /** Date of when the sale is supposed to be live. */
  liveDate?: Maybe<Scalars['String']>;
  /** Date of when the sale is supposed to be automatically opened. */
  openDate?: Maybe<Scalars['String']>;
};

/** Sale filter for sales. */
export type SaleFilter = {
  /** Filter by sale status */
  statuses: Array<SaleStatus>;
};

/** Item filter for sale items. */
export type SaleItemFilter = {
  /** Item IDs */
  itemIds?: InputMaybe<Array<Scalars['String']>>;
  /** Filter by item status */
  statuses?: InputMaybe<Array<ItemStatus>>;
};

/** Sale Status represent what status an sale is currently running in. */
export enum SaleStatus {
  /** Sale is closed for bidding. */
  Closed = 'CLOSED',
  /** Sale is closing. */
  Closing = 'CLOSING',
  /** Sale is now live. */
  Live = 'LIVE',
  /** Sale is opened for bidding. */
  Opened = 'OPENED',
  /** Sale is paused. */
  Paused = 'PAUSED',
  /** Sale is being processed. */
  Processing = 'PROCESSING',
  /** Sale has been published but is not opened for bidding. */
  Published = 'PUBLISHED',
  /** Sale has not been published. This status will never appear in the API expcept when you are previewing the sale. */
  Unpublished = 'UNPUBLISHED'
}

/** SaleType represents the type of sale */
export enum SaleType {
  /** Sale is a live auction */
  Live = 'LIVE',
  /** Sale is a online timed auction */
  OnlineTimed = 'ONLINE_TIMED'
}

export type SalesEdge = {
  __typename?: 'SalesEdge';
  /** Current sale cursor */
  cursor: Scalars['String'];
  /** Sale node */
  node: Sale;
};

export type ServerTime = {
  __typename?: 'ServerTime';
  /** Current Time */
  currentTime: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /**
   * Item changed subscription sends real-time information about changes
   * that happen to a item:
   * * When a bid is placed on a item
   * Server time will be sent also for syncronizing clocks with clients and server.
   * @deprecated use saleActivity instead
   */
  itemChanged: ItemChanged;
  /** Subscription for Sale and Item updates. */
  saleActivity?: Maybe<SaleActivity>;
  /**
   * Sale changed subscription send real-time information about changes
   * that happen on a sale:
   * * Changes to information for an sale such as dates, states, or a item is assigned to an sale or reordering has taken place.
   * Server time will be sent also for syncronizing clocks with clients and server.
   * Note: items will not be populated with those events.
   */
  saleChanged: SaleChanged;
  /** Subscription for multiple sales. */
  salesChanged: SaleChanged;
  /** Periodic server time updates to syncronize clocks in applications using Basta. */
  serverTimeChanged: ServerTime;
};


export type SubscriptionItemChangedArgs = {
  itemIds: Array<Scalars['ID']>;
  saleId: Scalars['ID'];
};


export type SubscriptionSaleActivityArgs = {
  saleId: Scalars['ID'];
};


export type SubscriptionSaleChangedArgs = {
  saleId: Scalars['ID'];
};


export type SubscriptionSalesChangedArgs = {
  saleIds: Array<Scalars['ID']>;
};

export type UserAccountSubscription = {
  __typename?: 'UserAccountSubscription';
  accountId: Scalars['String'];
  userId: Scalars['String'];
};

/** A UserBid represents a single bid */
export type UserBid = Node & {
  __typename?: 'UserBid';
  amount: Scalars['Int'];
  bidDate: Scalars['String'];
  id: Scalars['ID'];
  itemId: Scalars['String'];
  maxAmount: Scalars['Int'];
  saleId: Scalars['String'];
  userId: Scalars['String'];
};

export type UserBidsConnection = {
  __typename?: 'UserBidsConnection';
  /** UserBids edges */
  edges: Array<UserBidsEdge>;
  /** Current page information */
  pageInfo: PageInfo;
};

export type UserBidsEdge = {
  __typename?: 'UserBidsEdge';
  /** Current UserBid cursor */
  cursor: Scalars['String'];
  /** UserBid node */
  node: UserBid;
};

export type UserSaleItemSubscription = {
  __typename?: 'UserSaleItemSubscription';
  itemId: Scalars['String'];
  saleId: Scalars['String'];
  userId: Scalars['String'];
};

export type Get_SaleQueryVariables = Exact<{
  saleId: Scalars['String'];
}>;


export type Get_SaleQuery = { __typename?: 'Query', sale: { __typename?: 'Sale', id: string, accountId: string, status: SaleStatus, description?: string | null, currency?: string | null, title?: string | null, sequenceNumber: number, items: { __typename?: 'ItemsConnection', edges: Array<{ __typename?: 'ItemsEdge', cursor: string, node: { __typename?: 'Item', id: string, title?: string | null, description?: string | null, currentBid?: number | null, bidStatus?: BidStatus | null, totalBids: number, status: ItemStatus, saleId: string, reserveMet: boolean, startingBid?: number | null, nextAsks: Array<number>, images: Array<{ __typename?: 'Image', id: string, url: string, order: number }>, itemDates?: { __typename?: 'ItemDates', closingStart?: string | null, closingEnd?: string | null } | null, bids: Array<{ __typename?: 'Bid', amount: number, date: string, maxAmount?: number | null, bidStatus?: BidStatus | null, saleId: string, itemId: string, bidderIdentifier?: string | null }>, userBids: Array<{ __typename?: 'Bid', amount: number, date: string, maxAmount?: number | null, bidStatus?: BidStatus | null, saleId: string, itemId: string }> } }>, pageInfo: { __typename?: 'PageInfo', startCursor: string, endCursor: string, hasNextPage: boolean } }, incrementTable?: { __typename?: 'BidIncrementTable', rangeRules: Array<{ __typename?: 'RangeRule', step: number, highRange: number, lowRange: number }> } | null, dates: { __typename?: 'SaleDates', openDate?: string | null, closingDate?: string | null } } };

export type Get_SalesQueryVariables = Exact<{
  accountId: Scalars['String'];
}>;


export type Get_SalesQuery = { __typename?: 'Query', sales: { __typename?: 'SaleConnection', edges: Array<{ __typename?: 'SalesEdge', cursor: string, node: { __typename?: 'Sale', id: string, accountId: string, title?: string | null, description?: string | null, status: SaleStatus, currency?: string | null, type: SaleType, dates: { __typename?: 'SaleDates', closingDate?: string | null, openDate?: string | null, liveDate?: string | null } } }> } };

export type SubscribeItemChangesSubscriptionVariables = Exact<{
  saleId: Scalars['ID'];
  itemIds: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type SubscribeItemChangesSubscription = { __typename?: 'Subscription', itemChanged: { __typename?: 'Item', id: string, title?: string | null, description?: string | null, currentBid?: number | null, bidStatus?: BidStatus | null, totalBids: number, saleId: string, status: ItemStatus, nextAsks: Array<number>, reserveMet: boolean, itemDates?: { __typename?: 'ItemDates', closingStart?: string | null, closingEnd?: string | null } | null, bids: Array<{ __typename?: 'Bid', amount: number, maxAmount?: number | null, date: string, bidStatus?: BidStatus | null, saleId: string, itemId: string }>, userBids: Array<{ __typename?: 'Bid', amount: number, maxAmount?: number | null, date: string, bidStatus?: BidStatus | null, saleId: string, itemId: string }> } | { __typename?: 'ServerTime', currentTime: number } };

export type SubscribeSaleChangesSubscriptionVariables = Exact<{
  saleId: Scalars['ID'];
}>;


export type SubscribeSaleChangesSubscription = { __typename?: 'Subscription', saleChanged: { __typename?: 'Sale', id: string, status: SaleStatus } | { __typename?: 'ServerTime', currentTime: number } };

export type MaxBidOnItemMutationVariables = Exact<{
  saleId: Scalars['String'];
  itemId: Scalars['String'];
  maxAmount: Scalars['Int'];
}>;


export type MaxBidOnItemMutation = { __typename?: 'Mutation', bidOnItem: { __typename?: 'BidPlacedError', error: string, errorCode: BidErrorCode } | { __typename?: 'BidPlacedSuccess' } | { __typename?: 'MaxBidPlacedSuccess', amount: number, maxAmount: number, date: string, bidStatus: BidStatus } };
