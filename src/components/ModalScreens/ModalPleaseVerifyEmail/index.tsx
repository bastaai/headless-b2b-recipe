import styles from "./ModalPleaseVerifyEmail.module.css";

import { Modal } from "../../Modal";
import { CloseOverlay } from "../CloseOverlay";
import { Button } from "@/components/Button";

export type ModalPleaseVerifyEmailProps = {
  isOpen: boolean;
  onClose(): void;
};

export const ModalPleaseVerifyEmail: React.FC<ModalPleaseVerifyEmailProps> = (
  props
) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className={styles.ModalContainer}>
        <CloseOverlay onClick={props.onClose} />
        <div className={styles.ModalContent}>
          <div className={styles.verify_title}>Please verify your email</div>
          <div className={styles.verify_description}>
            <span>
              You have to verify your email to be able to place a bid.
            </span>
            <span>
              If you can&apos;t find the verification email, please check your
              spam folder.
            </span>
          </div>
          <Button enabled={true} onClick={props.onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
