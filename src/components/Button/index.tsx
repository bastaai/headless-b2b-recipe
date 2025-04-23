import styles from "./Button.module.css";

export type Props = {
  children: JSX.Element | JSX.Element[] | string | string[];
  onClick: () => void;
  enabled: boolean;
  secondary?: boolean;
  tabIndex?: number;
};

export const Button = (props: Props) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    if (props.enabled) {
      props.onClick();
    }
  };

  return (
    <button
      className={`${styles.Button} ${props.secondary ? "Secondary" : ""}`}
      onClick={handleClick}
      tabIndex={props.tabIndex ? props.tabIndex : 0}
    >
      {props.children}
    </button>
  );
};
