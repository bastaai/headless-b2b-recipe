import { useState } from "react";
import { resendVerificationEmail } from "src/clients/api";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { CloseOverlay } from "./CloseOverlay";
import styles from "./ModalEmailVerify.module.css";

export type ModalEmailVerifyProps = {
  isOpen: boolean;
  emailVerified: boolean;
  onClose(): void;
};

export const ModalEmailVerify: React.FC<ModalEmailVerifyProps> = (props) => {
  const [sent, setSent] = useState(false);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      {!sent ? (
        <div className={styles.container}>
          <CloseOverlay onClick={props.onClose} />
          <div className={styles.content}>
            <div className={styles.verify_title}>Email not verified</div>
            <div className={styles.verify_description}>
              <span>
                You have to verify your email to be able to place a bid.
              </span>
              <span>
                If you can&apos;t find the verification email, please check your
                spam folder.
              </span>
            </div>
            <Button
              onClick={() => {
                resendVerificationEmail()
                  .then(() => setSent(true))
                  .catch((error) => console.error(error));
              }}
              enabled={true}
            >
              Resend verification email
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <CloseOverlay onClick={props.onClose} />
          <div className={styles.content}>
            <div className={styles.verify_title}>Verification sent</div>
            <div className={styles.verify_description}>
              We have sent you a verification link to your email.
            </div>
            <Button
              onClick={() => {
                props.onClose();
                setSent(false);
              }}
              enabled={true}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
