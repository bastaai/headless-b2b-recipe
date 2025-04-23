import { diff } from "../../utils/dates";
import { Get_SaleQuery, SaleStatus } from "src/types/graphql";
import { useState, useEffect } from "react";
import moment from "moment";

export type PropTypes = {
  sale: Get_SaleQuery["sale"];
};

export const SaleStatusLine = ({ sale }: PropTypes) => {
  const [currLabel, setCurrLabel] = useState("Calculating times..");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrLabel(getLabel(sale));
    }, 1000);
    return () => clearInterval(interval);
  }, [sale]);

  return <span>{currLabel}</span>;
};

function getLabel(sale: Get_SaleQuery["sale"]): string {
  switch (sale.status) {
    case SaleStatus.Opened: {
      const closingDate = moment.utc(sale.dates.closingDate).toDate();
      const now = moment.utc().toDate();
      const timeDiff = diff(now, closingDate);
      return `Auction closes in ${timeDiff.days}d ${timeDiff.hours}h ${timeDiff.minutes}m ${timeDiff.seconds}s`;
    }

    case SaleStatus.Closing: {
      if (sale.items.edges[0]?.node.itemDates?.closingEnd) {
        const closingDate = moment
          .utc(sale.items.edges[0].node.itemDates.closingEnd)
          .toDate();
        const now = moment.utc().toDate();
        const timeDiff = diff(now, closingDate);
        return `Closing period ends in ${timeDiff.days}d ${timeDiff.hours}h ${timeDiff.minutes}m ${timeDiff.seconds}s`;
      } else {
        return `Closing period started`;
      }
    }

    case SaleStatus.Closed: {
      return "Auction has Closed";
      break;
    }

    case SaleStatus.Published: {
      const openDate = moment.utc(sale.dates.openDate).toDate();
      const now = moment.utc().toDate();
      const timeDiff = diff(now, openDate);
      return `Opens in ${timeDiff.days}d ${timeDiff.hours}h ${timeDiff.minutes}m ${timeDiff.seconds}s`;
    }

    case SaleStatus.Paused:
      return "Auction is paused";
      break;

    default:
      return "Invalid sale status";
      break;
  }
}
