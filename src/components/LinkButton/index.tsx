import styles from "./LinkButton.module.css";

export type PropTypes = {
  value: string;
  onClick: () => void;
};

export const LinkButton = ({ value, onClick }: PropTypes) => {
  return (
    <div className={styles.LinkButton}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {value}
      </a>
    </div>
  );
};
