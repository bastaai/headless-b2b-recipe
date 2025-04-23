import "../styles/reset200802.css";
import "../styles/colors.css";
import "../styles/grid.css";
import "../styles/base.css";
import { Header } from "../components/Header";

import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

import Script from "next/script";
import { Mulish } from "next/font/google";

import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "../queries/client";
import { useState, useEffect } from "react";
import { ModalSignUpSignIn } from "../components/ModalScreens/ModalSignUpSignIn";
import { ModalForgotPassword } from "../components/ModalScreens/ModalForgotPassword";
import { ModalError } from "../components/ModalScreens/ModalError";
import { ModalPleaseVerifyEmail } from "../components/ModalScreens/ModalPleaseVerifyEmail";

const mulish = Mulish({
  weight: ["200", "400", "700"],
  display: "swap",
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (query.error) {
      setShowErrorModal(true);
    }
  }, [router.events, query]);

  const [showSignUpSignInModal, setShowSignUpSingInModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);

  return (
    <>
      <ApolloProvider client={getApolloClient(pageProps.token || null)}>
        <SessionProvider session={session}>
          <div className={`contentContainer ${mulish.className}`}>
            <Header
              openSignInModal={() => {
                setShowSignUpSingInModal((show) => {
                  !show;
                  setTabIndex(1);
                });
              }}
            />
            <Component
              {...pageProps}
              openSignInModal={() => {
                setShowSignUpSingInModal((show) => {
                  !show;
                  setTabIndex(0);
                });
              }}
            />
            <ModalSignUpSignIn
              isOpen={showSignUpSignInModal}
              onClose={() => setShowSignUpSingInModal(false)}
              openForgotPasswordModal={() => setShowForgotPasswordModal(true)}
              openVerifyEmailModal={() => {
                setVerifyEmail(true);
              }}
              tabIndex={tabIndex}
            />
            <ModalForgotPassword
              isOpen={showForgotPasswordModal}
              onClose={() => setShowForgotPasswordModal(false)}
            />
            <ModalError
              isOpen={showErrorModal}
              onClose={() => setShowErrorModal(false)}
              error={query.error}
            />
            <ModalPleaseVerifyEmail
              isOpen={verifyEmail}
              onClose={() => setVerifyEmail(false)}
            />
          </div>
        </SessionProvider>
      </ApolloProvider>
      <Analytics />
    </>
  );
}
