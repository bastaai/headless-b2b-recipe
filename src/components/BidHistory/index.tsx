import { formatDistance } from "date-fns";
import { Bid } from "src/types/graphql";
import styles from "./BidHistoryModal.module.css";
import { Box, Divider } from "@mui/joy";
import { USD } from "@dinero.js/currencies";
import { dinero } from "dinero.js";
import { formatDinero } from "src/utils/dinerojs";

export type BidHistoryProps = {
  bids: Bid[];
  userBids: Bid[];
};

export const BidHistory = (props: BidHistoryProps) => {
  const bidList = (bids: Bid[], userBids: Bid[]) => {
    const sorted = bids
      .filter(
        (bid, index) =>
          bids.findIndex(
            (item) =>
              item.amount === bid.amount &&
              item.bidderIdentifier === bid.bidderIdentifier
          ) === index
      )
      .sort((a, b) => {
        if (b.amount > a.amount) return 1;
        if (b.amount < a.amount) return -1;
        if (new Date(b.date).getTime() > new Date(a.date).getTime()) return 1;
        if (new Date(b.date).getTime() < new Date(a.date).getTime()) return -1;
        else return 0;
      });

    return (
      <div className={styles.BidList}>
        {sorted.map((bid, index) => BidItem(bid, index, userBids))}
      </div>
    );
  };

  return (
    <div className={styles.ModalContainer}>
      <div className={styles.BidItem}>
        <span>User</span>
        <span>Time</span>
        <span className={styles.LastBidUnit}>Bid</span>
      </div>
      <Box py={0.5} paddingRight={2}>
        <Divider />
      </Box>
      {props.bids.length > 0 ? (
        <div className={styles.ModalContent}>
          {bidList(props.bids, props.userBids)}
        </div>
      ) : (
        <div className={styles.noBidsYet}>No bids yet</div>
      )}
    </div>
  );
};

export const BidItem = (bid: Bid, index: number, userBids: Bid[]) => {
  let identifier = "#" + bid.bidderIdentifier?.slice(0, 5);
  userBids.forEach((userbid) => {
    if (userbid.amount === bid.amount && userbid.date === bid.date) {
      identifier = "You";
    }
  });
  let date = formatDistance(new Date(bid.date), new Date(), {
    addSuffix: true,
  });
  if (date === "less than a minute ago") {
    date = "just now";
  }
  if (date.includes("about")) {
    date = date.replace("about", "");
  }
  return (
    <div
      key={index}
      className={`${styles.BidItem} ${
        identifier === "You" && styles.YourBidItem
      }`}
    >
      <div className={styles.BidUnit}>{identifier}</div>
      <div className={styles.BidUnit}>{date}</div>
      <div className={styles.LastBidUnit}>
        {formatDinero(
          dinero({
            amount: bid.amount ?? 0,
            currency: USD,
          })
        )}
      </div>
    </div>
  );
};
