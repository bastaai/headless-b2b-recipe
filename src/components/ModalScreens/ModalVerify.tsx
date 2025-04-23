import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { CloseOverlay } from "./CloseOverlay";
import styles from "./ModalVerify.module.css";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Spinner";

export type ModalVerifyProps = {
  isOpen: boolean;
  onClose(): void;
};

export enum MESSAGES {
  STARTED = "STARTED",
  FINISHED = "FINISHED",
  CANCELED = "CANCELED",
  RELOAD_REQUEST = "RELOAD",
  DONE = "DONE",
}

export const ModalVerify: React.FC<ModalVerifyProps> = (props) => {
  const { data: session, update: updateSession } = useSession();
  const [message, setMessage] = useState<MESSAGES>();
  const [retries, setRetries] = useState<number>(0);

  useEffect(() => {
    if (session?.user?.isIdentified) {
      setMessage(MESSAGES.DONE);
    }
  }, [session?.user?.isIdentified]);

  useEffect(() => {
    let intervalId: NodeJS.Timer | null = null;
    if (message === MESSAGES.FINISHED) {
      intervalId = setInterval(() => {
        setRetries(retries + 1);
        if (retries >= 15) {
          // Todo: rework - quick fix
          setRetries(0);
          setMessage(MESSAGES.RELOAD_REQUEST);
          return;
        }
        // Updating user session periodically to check if user has been identified
        updateSession();
      }, 2000);
    }

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, [message, retries, updateSession]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className={styles.container}>
        <CloseOverlay onClick={props.onClose} />
        <div className={styles.content}>
          {!message ? (
            <>
              <div className={styles.verify_title}>
                You need to be verified to place a bid
              </div>
            </>
          ) : message === MESSAGES.CANCELED ? (
            <>
              <div className={styles.verify_title}>
                Verification flow cancelled
              </div>
              <div className={styles.verify_controls}>
                <Button
                  onClick={() => {
                    // Reset flow
                    setMessage(undefined);
                    props.onClose();
                  }}
                  enabled={true}
                >
                  Close
                </Button>
              </div>
            </>
          ) : message === MESSAGES.FINISHED ? (
            <>
              <div className={styles.verify_title}>Verification submitted</div>
              <div className={styles.space}></div>
              <LoadingSpinner></LoadingSpinner>
            </>
          ) : message === MESSAGES.DONE ? (
            <>
              <div className={styles.verify_title}>Verification Complete</div>
              <div className={styles.verify_controls}>
                <Button
                  onClick={() => {
                    // Reset flow
                    setMessage(undefined);
                    props.onClose();
                  }}
                  enabled={true}
                >
                  Close
                </Button>
              </div>
            </>
          ) : message === MESSAGES.RELOAD_REQUEST ? (
            <>
              <div className={styles.verify_title}>Verification failed</div>
              <div className={styles.verify_controls}>
                <Button
                  onClick={() => {
                    // Reset flow
                    setMessage(undefined);
                    props.onClose();
                  }}
                  enabled={true}
                >
                  Close
                </Button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Modal>
  );
};
