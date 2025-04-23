import styles from "./ModalSignUpSignIn.module.css";

import { Modal } from "../Modal";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { Tabs } from "../Tabs";
import { Tab } from "../Tabs/Tab";
import { CloseOverlay } from "./CloseOverlay";

export type ModalSignUpSignInProps = {
  isOpen: boolean;
  onClose(): void;
  openForgotPasswordModal(): void;
  openVerifyEmailModal(): void;
  tabIndex: number;
};

export const ModalSignUpSignIn: React.FC<ModalSignUpSignInProps> = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className={styles.ModalContainer}>
        <CloseOverlay onClick={props.onClose} />
        <div className={styles.ModalContent}>
          <Tabs preSelectedTabIndex={props.tabIndex}>
            <Tab title="Sign Up">
              <SignUp
                onClose={props.onClose}
                openVerifyEmailModal={props.openVerifyEmailModal}
              />
            </Tab>
            <Tab title="Sign In">
              <SignIn
                onClose={props.onClose}
                openForgotPasswordModal={props.openForgotPasswordModal}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    </Modal>
  );
};
