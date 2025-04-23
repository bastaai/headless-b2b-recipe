import { getSales } from "../clients/graphql";
import { GetServerSideProps } from "next";

// Infer the sales data type from getSales
type SalesType = Awaited<ReturnType<typeof getSales>>;

interface Props {
  token: string | null;
  sales: SalesType;
}

export default function IndexPage(props: Props) {
  return (
    <>
      <div>Auctions:</div>
      {props.sales.map((sale) => (
        <div key={sale.node.id}>
          <a href={`/${sale.node.id}`}>
            <h2>{sale.node.title}</h2>
          </a>
          <p>{sale.node.description}</p>
          <p>Status: {sale.node.status}</p>
          <p>Currency: {sale.node.currency}</p>
          <p>Type: {sale.node.type}</p>
          <p>
            Open Date:{" "}
            {sale.node.dates.openDate
              ? new Date(sale.node.dates.openDate).toLocaleString()
              : "N/A"}
          </p>
          <p>
            Closing Date:{" "}
            {sale.node.dates.closingDate
              ? new Date(sale.node.dates.closingDate).toLocaleString()
              : "N/A"}
          </p>
        </div>
      ))}
    </>
  );
}

export const getStaticProps: GetServerSideProps<Props> = async ({}) => {
  const accountId = process.env.BASTA_ACCOUNT_ID;
  if (!accountId) {
    throw new Error("BASTA_ACCOUNT_ID is not set");
  }

  // Make query for the auction to send over the wire.
  const sales = await getSales(accountId, null);

  return {
    props: {
      token: null,
      sales,
    },
  };
};
