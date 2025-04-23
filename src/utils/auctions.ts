import { BidStatus, Get_SaleQuery, Item } from "../types/graphql";
import { first, lastError } from "./array";

/**
 * calculateNextBidAsk calclates the next bid ask.
 * Can be used to select the next bid that a given bidder
 * should select when placing a bid.
 * @param item item to calculate next bid ask for
 * @returns returns the next ask as a number.
 */
export function calculateNextBidAsk(
  item: Get_SaleQuery["sale"]["items"]["edges"][0]["node"]
): number {
  // If the nextAsks array is empty, there are no asks. The function
  // throws an error when if this case comes up.
  if (item.nextAsks.length == 0) {
    throw new Error(
      "unable to calculate next bid ask from empty array of asks"
    );
  }

  // if the current bid status is NotBidding, we drop to the first ask.
  if (item.bidStatus === BidStatus.NotBidding) {
    return item.nextAsks[0];
  }

  // Check if the user is bidding, if so we fetch the max amount of the last bid.
  if (item.userBids.length > 0) {
    const lastBid = lastError(item.userBids);
    if (lastBid.maxAmount) {
      const nextAsk = first(
        item.nextAsks,
        (v) => v > (lastBid.maxAmount as number)
      );
      if (nextAsk) {
        return nextAsk;
      }
    }
  }

  return item.nextAsks[0];
}
