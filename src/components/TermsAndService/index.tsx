import styles from "./TermsAndService.module.css";

export const TermsAndService = () => (
  <div className={styles.Terms}>
    <p>
      By signing up, you agree to the&nbsp;
      <a href="conditions_of_sale.pdf" target="_blank">
        Terms and Service
      </a>{" "}
      and the{" "}
      <a
        href="https://www.davidlynchfoundation.org/privacy.html"
        target="blank"
      >
        Privacy Policy
      </a>
    </p>
  </div>
);
