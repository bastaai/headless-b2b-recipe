import styles from "./SignIn.module.css";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";
import { LinkButton } from "@/components/LinkButton";
import { PasswordInput } from "@/components/PasswordInput";
import { InfoMessage } from "@/components/InfoMessage";
import { Divider } from "@/components/Divider";

import { validEmail } from "src/utils/email";
import { TermsAndService } from "@/components/TermsAndService";

export const logIn = async (
  email: string,
  pass: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const res = await signIn("credentials", {
    redirect: false,
    email: email,
    password: pass,
    callbackUrl: `${window.location.origin}`,
  });

  if (res?.ok) return onSuccess();
  onError();
};

export type SignInProps = {
  onClose(): void;
  openForgotPasswordModal(): void;
};

export const SignIn = (props: SignInProps) => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const validateInputs = (): boolean => {
    if (!validEmail(email)) {
      setEmailError(true);
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (pass.length <= 0) {
      setEmailError(false);
      setEmailError(true);
      setErrorMessage("Please enter your password.");
      return false;
    }
    return true;
  };

  const loginError = () => {
    setEmailError(true);
    setPassError(true);
    setErrorMessage("Incorrect email or password.");
  };

  return (
    <div className={styles.Wrapper}>
      <Button secondary={true} enabled={true} onClick={() => signIn("google")}>
        <>
          <Image width="16" height="16" src="/google.svg" alt="google" />
          Sign in with Google
        </>
      </Button>
      <Button
        secondary={true}
        enabled={true}
        onClick={() => signIn("facebook")}
      >
        <>
          <Image width="16" height="16" src="/fb.svg" alt="facebook" />
          Sign in with Facebook
        </>
      </Button>
      <Divider value="OR" className={styles.TextDivider} />
      {errorMessage.length > 0 ? (
        <InfoMessage className={styles.Info} value={errorMessage} />
      ) : (
        ""
      )}

      <form>
        <Input
          name="email"
          type="text"
          placeholder="Email address*"
          setValue={setEmail}
          error={emailError}
        />
        <PasswordInput
          name="password"
          placeholder="Password*"
          setValue={setPassword}
          error={passError}
        />
        <div className={styles.ForgotPasswordContainer}>
          <LinkButton
            value="Forgot your password?"
            onClick={() => {
              props.onClose();
              props.openForgotPasswordModal();
            }}
          />
        </div>
        <Button
          onClick={() => {
            if (validateInputs()) logIn(email, pass, props.onClose, loginError);
          }}
          enabled={true}
        >
          Sign in
        </Button>
      </form>
      <TermsAndService />
    </div>
  );
};
