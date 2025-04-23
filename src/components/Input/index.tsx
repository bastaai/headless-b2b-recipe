import styles from "./Input.module.css";

export type IconProps = {
  icon: JSX.Element;
  changeDisplay(): void;
};

export type Props = {
  placeholder: string;
  name: string;
  type: string;
  setValue: any;
  iconProps?: IconProps;
  error?: boolean;
  tabIndex?: number;
};

export const Input = (props: Props) => {
  return (
    <div className={styles.InputContainer}>
      <input
        className={`${styles.Input} ${props.error ? styles.ErrorInput : ""}`}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) => props.setValue(e.target.value)}
        required
        tabIndex={props.tabIndex ? props.tabIndex : 0}
      />

      {props.iconProps != null ? (
        <div
          className={styles.Icon}
          onClick={() => {
            props.iconProps?.changeDisplay();
          }}
        >
          {props.iconProps.icon}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
