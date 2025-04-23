import styles from "./CloseOverlay.module.css";

export type CloseOverlayProps = {
  onClick(): void;
};

export const CloseOverlay: React.FC<CloseOverlayProps> = (props) => {
  return (
    <div
      className={styles.close}
      aria-label="Close modal"
      onClick={props.onClick}
      tabIndex={0}
      onKeyUp={(e) => {
        if (e.code == "Enter" || e.code == "Space") props.onClick();
      }}
    />
  );
};
