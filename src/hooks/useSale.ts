import { Dispatch, SetStateAction, useState, useEffect } from "react";
import {
  getSale,
  placeMaxBid as requestPlaceMaxBid,
} from "src/clients/graphql";
import { Sale } from "src/types/graphql";
import { useSaleSubscriptions, useItemUpdate } from "./subscriptions";
import useToken from "./token";

// TODO: move this to hooks folder.
export function useSale(
  s: Sale,
  initToken: string | null
): [
  Sale,
  Dispatch<SetStateAction<Sale>>,
  (saleId: string, itemId: string, maxAmount: number) => Promise<void>
] {
  const token = useToken(initToken);
  const [saleState, setSaleState] = useState<Sale>(s);
  const [saleChanges, _saleChangesLoading] = useSaleSubscriptions(s.id);
  const [saleItemChanges, _saleItemChangesLoading] = useItemUpdate(
    s.id,
    s.items.edges.map((x) => x.node.id)
  );

  useEffect(() => {
    getSale(saleState.id, token)
      .then((newSale) => setSaleState(newSale))
      .catch((err) => console.error(err));
  }, [saleChanges, saleItemChanges, saleState.id, token]);

  /**
   * Place a max bid on an item in a sale.
   */
  const placeMaxBid = (
    saleId: string,
    itemId: string,
    maxAmount: number
  ): Promise<void> => {
    return requestPlaceMaxBid(saleId, itemId, token, maxAmount).then((res) => {
      if (res.bidOnItem.errorCode) {
        console.error("Error placing max bid", res.bidOnItem);
        throw res.bidOnItem;
      }

      // Side affect refetch if successfully placed bid.
      getSale(saleId, token)
        .then((newSale) => setSaleState(newSale))
        .catch((err) =>
          console.error(`error when refetching sale after placing bid: ${err}`)
        );
    });
  };

  return [saleState, setSaleState, placeMaxBid];
}
