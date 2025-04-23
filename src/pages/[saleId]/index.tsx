import { GetServerSideProps } from "next";
import { getSale } from "src/clients/graphql";
import { useSale } from "src/hooks/useSale";
import { Sale } from "src/types/graphql";
import LotDetailPage from "@/components/LotPage/LotDetailPage";
import { isValid } from "src/utils/saleid";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getBastaManagementClient } from "src/clients";

export default function SalePage({
  token: serverToken,
  saleJson,
  openSignInModal,
}: {
  saleJson: string;
  token: string | null;
  openSignInModal: () => void;
}) {
  const [saleState, _setSaleState, placeMaxBid] = useSale(
    JSON.parse(saleJson) as Sale,
    serverToken
  );

  return (
    <>
      <LotDetailPage
        sale={saleState}
        bidderToken={serverToken}
        item={saleState.items.edges[0].node}
        placeMaxBid={placeMaxBid}
        openSignInModal={openSignInModal}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  // Verify saleId
  const saleId = String(context.query.saleId);
  if (!isValid(saleId)) {
    return {
      notFound: true,
    };
  }

  let token: string | null = null;

  if (session?.user?.id) {
    const bastaManagementClient = getBastaManagementClient();
    const bidderToken = await bastaManagementClient.genenerateBiddersToken(
      session.user.id
    );
    token = bidderToken.token;
  }

  const sale = await getSale(saleId, token);

  return {
    props: {
      token: token,
      saleJson: JSON.stringify(sale),
    },
  };
};
