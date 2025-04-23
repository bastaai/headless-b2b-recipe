import { useState } from "react";
import { useSession } from "next-auth/react";

import styles from "./RecoveryPage.module.css";
import { Button } from "@/components/Button";
import { PasswordInput } from "@/components/PasswordInput";
import { InfoMessage } from "@/components/InfoMessage";

const RecoveryPage = () => {
  const { data: session } = useSession();

  const [recovered, setRecovered] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [pass1Error, setPass1Error] = useState(false);
  const [pass2Error, setPass2Error] = useState(false);

  const validateInputs = (): boolean => {
    if (password1.length < 8) {
      setPass1Error(true);
      setErrorMessage("Password must be at least 8 characters.");
      return false;
    }
    if (password2 !== password1) {
      setPass2Error(true);
      setErrorMessage("Passwords do not match.");
      return false;
    }
    return true;
  };

  const resetPassword = async () => {
    const response = await fetch("/api/auth/password/reset", {
      method: "POST",
      body: JSON.stringify({
        password1,
        password2,
        email: session?.user?.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setErrorMessage("Reset password failed. Please try again.");
      return;
    }
    setRecovered(true);
  };

  return (
    <div className={styles.RecoveryPage}>
      <div className={styles.blockMedium}>
        <h1>Reset Password</h1>
        {!recovered ? (
          <>
            <p>
              Your new password must be different from previous used passwords.
            </p>
            {errorMessage.length > 0 ? (
              <InfoMessage className={styles.Info} value={errorMessage} />
            ) : (
              ""
            )}
            <form>
              <PasswordInput
                name="password1"
                placeholder="New password*"
                setValue={setPassword1}
                error={pass1Error}
              />
              <PasswordInput
                name="password2"
                placeholder="Confirm password*"
                setValue={setPassword2}
                error={pass2Error}
              />
              <Button
                onClick={() => {
                  if (validateInputs()) resetPassword();
                }}
                enabled={true}
              >
                Reset Password
              </Button>
            </form>
          </>
        ) : (
          <>
            <p>Your password has been reset.</p>
            <Button
              onClick={() => {
                location.replace("/");
              }}
              enabled={true}
            >
              Back to auction
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecoveryPage;
