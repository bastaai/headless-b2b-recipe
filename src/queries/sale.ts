import { gql } from "graphql-request";
import { gql as appollogql } from "@apollo/client";

export const saleQuery = gql`
  query GET_SALE($saleId: String!) {
    sale(id: $saleId) {
      id
      accountId
      status
      description
      currency
      title
      currency
      items {
        edges {
          cursor
          node {
            id
            images {
              id
              url
              order
            }
            title
            description
            currentBid
            bidStatus
            totalBids
            status
            saleId
            reserveMet
            itemDates {
              closingStart
              closingEnd
            }
            startingBid
            nextAsks(iterations: 300)
            bids {
              amount
              date
              maxAmount
              bidStatus
              saleId
              itemId
              bidderIdentifier
            }
            userBids {
              amount
              date
              maxAmount
              bidStatus
              saleId
              itemId
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
      incrementTable {
        rangeRules {
          step
          highRange
          lowRange
        }
      }
      sequenceNumber
      dates {
        openDate
        closingDate
      }
    }
  }
`;

export const salesQuery = gql`
  query GET_SALES($accountId: String!) {
    sales(accountId: $accountId) {
      edges {
        cursor
        node {
          id
          accountId
          title
          description
          status
          currency
          status
          dates {
            closingDate
            openDate
            liveDate
          }
          type
        }
      }
    }
  }
`;

export const SUBSCRIBE_SALE_ITEM_CHANGES = appollogql`
  subscription SubscribeItemChanges($saleId: ID!, $itemIds: [ID!]!) {
    itemChanged(saleId: $saleId, itemIds: $itemIds) {
      ... on Item {
        id
        title
        description
        currentBid
        bidStatus
        totalBids
        itemDates {
          closingStart
          closingEnd
        }
        saleId
        status
        nextAsks
        reserveMet
        bids {
          amount
          maxAmount
          date
          bidStatus
          saleId
          itemId
        }
        userBids {
          amount
          maxAmount
          date
          bidStatus
          saleId
          itemId
        }
      }
      ... on ServerTime {
        currentTime
      }
    }
  }`;

export const SUBSCRIBE_SALE_CHANGES = appollogql`
  subscription SubscribeSaleChanges($saleId: ID!) {
    saleChanged(saleId: $saleId) {
      ... on Sale {
        id
        status
      }
      ... on ServerTime {
        currentTime
      }
    }
  }`;

export const MAX_BID_ON_ITEM = gql`
  mutation MaxBidOnItem($saleId: String!, $itemId: String!, $maxAmount: Int!) {
    bidOnItem(saleId: $saleId, itemId: $itemId, amount: $maxAmount, type: MAX) {
      ... on MaxBidPlacedSuccess {
        amount
        maxAmount
        date
        bidStatus
      }
      ... on BidPlacedError {
        error
        errorCode
      }
    }
  }
`;
