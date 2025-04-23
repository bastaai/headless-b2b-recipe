import styles from "./TabTitle.module.css";

import React, { useCallback } from "react";

export type Props = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  isActive?: boolean;
};

export const TabTitle = ({ title, setSelectedTab, index, isActive }: Props) => {
  const handleOnClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <div
      tabIndex={0}
      className={`${styles.Title} ${isActive ? "active" : ""}`}
      onClick={handleOnClick}
      onKeyUp={(e) => {
        if (e.code == "Enter" || e.code == "Space") handleOnClick();
      }}
    >
      {title}
    </div>
  );
};
