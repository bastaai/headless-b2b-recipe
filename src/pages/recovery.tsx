import RecoveryPage from "@/components/Pages/RecoveryPage";
import { GetStaticProps } from "next";

export default function IndexPage() {
  return <RecoveryPage />;
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {},
  };
};
