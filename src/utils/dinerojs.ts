import { add, allocate, Dinero, toDecimal } from "dinero.js";

export const formatDinero = (d: Dinero<number>) => {
  return toDecimal(d, ({ value, currency }) =>
    Number(value).toLocaleString("en-US", {
      style: "currency",
      currency: currency.code,
    })
  );
};

export const addPercentage = (d: Dinero<number>, pct: number) => {
  const all = allocate(d, [pct, 100 - pct]);
  const added = add(d, all[0]);

  return added;
};
