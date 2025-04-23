import styles from "./SignUp.module.css";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useState } from "react";
import { logIn } from "../SignIn";
import { PasswordInput } from "@/components/PasswordInput";
import { validEmail } from "src/utils/email";
import { InfoMessage } from "@/components/InfoMessage";
import { Divider } from "@/components/Divider";
import { TermsAndService } from "@/components/TermsAndService";

export type SignInProps = {
  onClose(): void;
  openVerifyEmailModal(): void;
};

export const SignUp = ({ onClose, openVerifyEmailModal }: SignInProps) => {
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const validateInputs = (): boolean => {
    if (firstName.length <= 0) {
      setFirstNameError(true);
      setErrorMessage("Please enter your first name.");
      return false;
    }
    if (lastName.length <= 0) {
      setFirstNameError(false);
      setLastNameError(true);
      setErrorMessage("Please enter your last name.");
      return false;
    }
    if (!validEmail(email)) {
      setFirstNameError(false);
      setLastNameError(false);
      setEmailError(true);
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (pass.length < 8) {
      setFirstNameError(false);
      setLastNameError(false);
      setEmailError(false);
      setPassError(true);
      setErrorMessage("Password must be at least 8 characters.");
      return false;
    }
    return true;
  };

  const loginError = () => {
    setErrorMessage("Incorrect email or password.");
  };

  const createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    callbackPath: string = window.location.pathname
  ): Promise<boolean> => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        callbackPath,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setErrorMessage("User with this email already exists.");
      return false;
    }

    return true;
  };
  const signUp = async () => {
    if (await createUser(firstName, lastName, email, pass)) {
      await logIn(
        email,
        pass,
        () => {
          openVerifyEmailModal();
          onClose();
        },
        loginError
      );
    }
  };

  return (
    <div className={styles.Wrapper}>
      <Button
        secondary={true}
        enabled={true}
        onClick={() => signIn("google", { callbackUrl: "/ray-dalio" })}
      >
        <>
          <Image width="16" height="16" src="/google.svg" alt="google" />
          Continue with Google
        </>
      </Button>
      <Button
        secondary={true}
        enabled={true}
        onClick={() => signIn("facebook")}
      >
        <>
          <Image width="16" height="16" src="/fb.svg" alt="facebook" />
          Continue with Facebook
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
          name="firstName"
          type="text"
          placeholder="First name*"
          setValue={setFirstName}
          error={firstNameError}
        />
        <Input
          name="lastName"
          type="text"
          placeholder="Last name*"
          setValue={setLastName}
          error={lastNameError}
        />
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

        <Button
          onClick={() => {
            if (validateInputs()) signUp();
          }}
          enabled={true}
        >
          Sign Up
        </Button>
      </form>
      <TermsAndService />
    </div>
  );
};
