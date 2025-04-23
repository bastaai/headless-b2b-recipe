import styles from "./Divider.module.css";

export type DividerProps = {
  value: string;
  className: string;
};

export const Divider = ({ value, className }: DividerProps) => (
  <div className={`${styles.Divider} ${className}`}>
    <span>{value}</span>
  </div>
);
