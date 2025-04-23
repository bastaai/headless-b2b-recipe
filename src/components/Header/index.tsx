import { signOut, useSession } from "next-auth/react";
import styles from "./Header.module.css";
import useToken from "src/hooks/token";
import Image from "next/image";
import { LinkButton } from "../LinkButton";
import { Button } from "../Button";

export type Props = {
  openSignInModal: () => void;
};

export const Header = ({ openSignInModal }: Props) => {
  const { data: session } = useSession();

  let loginControl;

  if (session) {
    loginControl = (
      <div className={styles.loggedInControl}>
        <div className={styles.userName}>
          <span>{session.user?.name}</span>
          <span className={styles.icon}>
            &nbsp;
            <span className={styles.iconObj}>
              {session.user?.isVerified ? (
                <>
                  <span>You are verified</span>
                  <Image
                    style={{
                      marginLeft: "4px",
                    }}
                    src="/verified.svg"
                    alt="Verified User"
                    width="14"
                    height="14"
                  />
                </>
              ) : (
                <span>You are not verified</span>
              )}
            </span>
          </span>
        </div>

        <div className={styles.LogoutButtonContainer}>
          <LinkButton
            onClick={() => {
              signOut();
            }}
            value={"Sign out"}
          />
        </div>
      </div>
    );
  } else {
    loginControl = (
      <div className={styles.loginControl}>
        <Button
          enabled={true}
          secondary={true}
          onClick={() => {
            openSignInModal();
          }}
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="grid">
      <div className={styles.Header}>{loginControl}</div>
    </div>
  );
};
