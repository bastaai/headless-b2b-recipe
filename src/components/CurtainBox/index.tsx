import { useState } from "react";
import styles from "./CurtainBox.module.css";
import Image from "next/image";

export type PropTypes = {
  title: string;
  children?: JSX.Element | JSX.Element[];
  tabIndex?: number;
};
export const CurtainBox = ({ title, children, tabIndex }: PropTypes) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={styles.CurtainBox}
      tabIndex={tabIndex ? tabIndex : 0}
      onKeyUp={(e) => {
        if (e.code == "Enter" || e.code == "Space") {
          setIsOpen(!isOpen);
        }
      }}
    >
      <div
        className={styles.header}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span>{title}</span>
        <div
          className={styles.arrowButton}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div className={`${styles.arrow} ${isOpen ? styles.open : null}`}>
            <Image
              src="/chevron-icon.svg"
              alt="Chevron Icon"
              width="12"
              height="12"
            />
          </div>
        </div>
      </div>

      <div className={isOpen ? styles.children : styles.childrenClosed}>
        {children}
      </div>
    </div>
  );
};
