import { getSales } from "../clients/graphql";
import { GetServerSideProps } from "next";
import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Link as JoyLink,
} from "@mui/joy";
import NextLink from "next/link";

type SalesType = Awaited<ReturnType<typeof getSales>>;

interface Props {
  token: string | null;
  sales: SalesType;
}

export default function IndexPage({ sales }: Props) {
  return (
    <>
      <Typography level="h3" component="h1" sx={{ mb: 2 }}>
        Auctions
      </Typography>
      <List sx={{ gap: 2 }}>
        {sales.map((sale) => (
          <ListItem key={sale.node.id}>
            <Card variant="outlined" sx={{ width: "100%" }}>
              <CardContent>
                <Typography level="h4" component="div">
                  <JoyLink
                    component={NextLink}
                    href={`/${sale.node.id}`}
                    underline="hover"
                  >
                    {sale.node.title}
                  </JoyLink>
                </Typography>
                <Typography level="body-lg" sx={{ mb: 1 }}>
                  {sale.node.description}
                </Typography>
                <Typography level="body-lg">
                  Status: {sale.node.status}
                </Typography>
                <Typography level="body-lg">
                  Currency: {sale.node.currency}
                </Typography>
                <Typography level="body-lg">Type: {sale.node.type}</Typography>
                <Typography level="body-lg">
                  Open Date:{" "}
                  {sale.node.dates.openDate
                    ? new Date(sale.node.dates.openDate).toLocaleString()
                    : "N/A"}
                </Typography>
                <Typography level="body-lg">
                  Closing Date:{" "}
                  {sale.node.dates.closingDate
                    ? new Date(sale.node.dates.closingDate).toLocaleString()
                    : "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const accountId = process.env.BASTA_ACCOUNT_ID;
  if (!accountId) {
    throw new Error("BASTA_ACCOUNT_ID is not set");
  }

  const sales = await getSales(accountId, null);

  return {
    props: {
      token: null,
      sales,
    },
  };
};
