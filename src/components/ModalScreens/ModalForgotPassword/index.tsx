import styles from "./ModalForgotPassword.module.css";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";

import { Modal } from "../../Modal";
import { validEmail } from "src/utils/email";
import { InfoMessage } from "@/components/InfoMessage";
import { CloseOverlay } from "../CloseOverlay";

export type ModalForgotPasswordProps = {
  isOpen: boolean;
  onClose(): void;
};

export const ModalForgotPassword: React.FC<ModalForgotPasswordProps> = (
  props
) => {
  const [email, setEmail] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);

  const validateInputs = (): boolean => {
    if (!validEmail(email)) {
      setEmailError(true);
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const closeModal = () => {
    setEmail("");
    setShowConfirmation(false);
    props.onClose();
  };

  const recoverPassword = async () => {
    const response = await fetch("/api/auth/password/recovery", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.message);
      return;
    }

    setShowConfirmation(true);

    return data;
  };
  return (
    <Modal isOpen={props.isOpen} onClose={closeModal}>
      <div className={styles.ModalContainer}>
        <CloseOverlay onClick={props.onClose} />
        <div className={styles.ModalContent}>
          <div className={styles.Title}>Forgot your password?</div>
          {!showConfirmation ? (
            <>
              <div className={styles.Description}>
                We will send you a password recovery email so you can create a
                new password.
              </div>{" "}
              {errorMessage.length > 0 ? (
                <InfoMessage className={styles.Info} value={errorMessage} />
              ) : (
                ""
              )}
              <form>
                <Input
                  name="email"
                  type="text"
                  placeholder="Enter your email address*"
                  setValue={setEmail}
                  error={emailError}
                />
                <Button
                  onClick={() => {
                    if (validateInputs()) recoverPassword();
                  }}
                  enabled={true}
                >
                  Reset Password
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className={styles.Description}>
                We just sent and email to you at <span>{email}</span>. It
                contains a link where you can change your password.
              </div>
              <Button onClick={closeModal} enabled={true}>
                Close
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
