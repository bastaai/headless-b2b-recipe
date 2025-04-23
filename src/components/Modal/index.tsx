import React, { useCallback, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export type ModalProps = {
  onClose(): void;
  isOpen: boolean;
  children: JSX.Element;
};

export const Modal: React.FC<ModalProps> = (props) => {
  let modalRef = useRef<HTMLDivElement>(null);

  const keyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && props.isOpen) {
        props.onClose();
      }
    },
    [props.onClose, props.isOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
      modalRef?.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }
  }, [props.isOpen]);

  if (props.isOpen === false) return null;

  return (
    <div className={styles.ModalBackground}>
      <div ref={modalRef} tabIndex={0}>
        {props.children}
      </div>
    </div>
  );
};
