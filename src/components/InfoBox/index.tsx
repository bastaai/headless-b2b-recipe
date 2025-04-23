import { Card, Grid } from "@mui/joy";

export type PropsType = {
  value: string;
};

export const InfoBox = ({ value }: PropsType) => (
  <Grid md={3} xs={6}>
    <Card
      sx={{
        aspectRatio: 1 / 1,
        backgroundColor: "#F7F7FE",
        color: "var(--color-main-dark-blue)",
        fontSize: "26px",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        boxShadow: "none",
      }}
    >
      {value}
    </Card>
  </Grid>
);
