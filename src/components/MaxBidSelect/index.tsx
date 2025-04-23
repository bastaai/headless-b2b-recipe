import { StylesConfig } from "react-select";
import Select from "react-select";

import styles from "./maxbidselect.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import { USD } from "@dinero.js/currencies";
import { dinero } from "dinero.js";
import { formatDinero } from "src/utils/dinerojs";

export type TOption = {
  label: string | number;
  value: string | number;
};

export type SelectProps = {
  id: string;
  title: string;
  disabled: boolean;
  onChange: (newValue: string) => void;
  options: TOption[];
  currency: string;
  placeholder: string;
};

const colourStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    height: 48,
    minHeight: 48,
    borderColor: "#ABABF0",
    "@media only screen and (max-width: 1156px)": {
      minHeight: 56,
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    height: "48px",
    padding: "0 6px",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  clearIndicator: (styles) => ({
    ...styles,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  input: (styles) => ({
    ...styles,
    margin: 0,
    paddingLeft: 4,
    paddingBottom: 0,
  }),
  container: (styles) => ({
    ...styles,
    padding: 0,
    width: "100%",
  }),
  placeholder: (styles) => ({
    ...styles,
    padding: 0,
    paddingBottom: 0,
    paddingLeft: 4,
    lineHeight: 1,
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    padding: 0,
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    padding: 0,
    marginBottom: 0,
  }),
  singleValue: (styles) => ({
    ...styles,
    padding: 0,
    paddingBottom: 0,
    paddingLeft: 4,
  }),
};

export const MaxBidSelect: React.FC<SelectProps> = (props) => {
  // Local state of current value
  const [value, setValue] = useState(props.options[0]);
  const [interacted, setInteracted] = useState(false);

  // If options change, update the current value
  useEffect(() => {
    if (!interacted) {
      setValue(props.options[0]);
      props.onChange(props.options[0].value.toString());
    }
  }, [interacted, props, props.options]);

  return (
    <div className={styles.select_wrapper}>
      <label htmlFor={props.id || ""}>{props.title}</label>
      <div className={styles.tooltip}>
        <div className={styles.tooltiptext}>
          <p>
            Your max bid is a secret amount you enter, that represents the
            maximum amount you are willing to bid. Our system automatically bids
            on your behalf up to your maximum bid amount in response to other
            bids, according to our bidding tiers. You are free to increase your
            max bid at any time.
          </p>
        </div>
        <Image
          style={{
            marginLeft: "8px",
          }}
          src="/info.svg"
          alt="Tooltip"
          width="14"
          height="14"
        />
      </div>

      <Select
        styles={colourStyles}
        classNamePrefix="select"
        value={value}
        className={styles.select_inner}
        onChange={(newValue: any) => {
          setInteracted(true);
          setValue(newValue);
          props.onChange(newValue?.value || "");
        }}
        defaultValue={props.options[0]}
        placeholder={props.placeholder}
        isDisabled={props.disabled}
        onInputChange={(newValue: string) => {
          props.onChange(newValue);
        }}
        onKeyDown={(e) => {
          if (
            !/[0-9]/.test(e.key) &&
            e.code !== "Backspace" &&
            e.code !== "ArrowUp" &&
            e.code !== "ArrowDown" &&
            e.code !== "Enter" &&
            e.code !== "Space" &&
            e.code !== "Tab"
          ) {
            e.preventDefault();
          }
        }}
        noOptionsMessage={(amount) => {
          let amountInput = 0;
          const maybeAmount = Number(amount.inputValue);

          if (maybeAmount) {
            amountInput = maybeAmount;
          }

          return `Cannot accept bid of ${formatDinero(
            dinero({
              amount: amountInput * 100 ?? 0,
              currency: USD,
            })
          )}`;
        }}
        id={props.id}
        options={props.options}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#efeff0",
            primary: "#4646C7",
          },
        })}
      />
    </div>
  );
};
