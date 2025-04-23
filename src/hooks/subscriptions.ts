import { useSubscription } from "@apollo/client";
import {
  SUBSCRIBE_SALE_CHANGES,
  SUBSCRIBE_SALE_ITEM_CHANGES,
} from "src/queries/sale";

export function useSaleSubscriptions(saleId: string) {
  // TODO: check if there are errors with subscription.
  // TODO: we are not passing in the tokens.
  const { data, loading } = useSubscription(SUBSCRIBE_SALE_CHANGES, {
    variables: { saleId },
  });

  return [data, loading];
}

export function useItemUpdate(saleId: string, itemIds: string[]) {
  // TODO: check if there are errors with subscription.
  // TODO: we are not passing in the tokens.
  const { data, loading } = useSubscription(SUBSCRIBE_SALE_ITEM_CHANGES, {
    variables: { saleId, itemIds },
  });

  return [data, loading];
}
