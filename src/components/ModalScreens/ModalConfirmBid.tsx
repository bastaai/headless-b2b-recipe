import { Box, Button, Divider, Modal, ModalClose, ModalDialog } from "@mui/joy";
import { USD } from "@dinero.js/currencies";
import { allocate, dinero } from "dinero.js";
import { addPercentage, formatDinero } from "src/utils/dinerojs";
import { Item, Sale } from "src/types/graphql";
import { useState } from "react";
import LoadingSpinner from "../Spinner";
import { InfoMessage } from "../InfoMessage";
import styles from "./ModalConfirmBid.module.css";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  weight: ["200", "400", "700"],
  display: "swap",
  subsets: ["latin"],
});

export default function ConfirmBidModal({
  isOpen,
  onClose,
  placeMaxBid,
  selectedMaxBid,
  sale,
  item,
}: {
  isOpen: boolean;
  onClose: () => void;
  placeMaxBid(saleId: string, itemId: string, maxAmount: number): Promise<void>;
  selectedMaxBid: number;
  sale: Sale;
  item: Item;
}) {
  const [loading, setLoading] = useState(false);
  const [bidError, setBidError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose();
        setBidError(false);
      }}
    >
      <ModalDialog>
        <div className={`${mulish.className}`}>
          <ModalClose />
          <Box p={2} />

          <h4 className={styles.modalHero}>Bid Summary</h4>

          <Box p={2} />

          <Box p={1}>
            <table style={{ maxWidth: 300, width: "100%", color: "#1f1f5c" }}>
              <tbody>
                <tr>
                  <td width="100%">Bid amount</td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "right" }}>
                    {formatDinero(
                      dinero({
                        amount: selectedMaxBid,
                        currency: USD,
                      })
                    )}
                  </td>
                </tr>

                <tr>
                  <td width="100%">Basta bid fee 1.25%</td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "right" }}>
                    {formatDinero(
                      allocate(
                        dinero({
                          amount: selectedMaxBid,
                          currency: USD,
                        }),
                        [1.25, 98.75]
                      )[0]
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                  </td>
                </tr>
                <tr>
                  <td width="100%">Total</td>
                  <td style={{ whiteSpace: "nowrap", textAlign: "right" }}>
                    {formatDinero(
                      addPercentage(
                        dinero({
                          amount: selectedMaxBid,
                          currency: USD,
                        }),
                        1.25
                      )
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>

          <Box p={2} />

          <Button
            fullWidth
            onClick={() => {
              setLoading(true);
              placeMaxBid(sale.id, sale.items.edges[0].node.id, selectedMaxBid)
                .then(() => {
                  setLoading(false);
                  setBidError(false);
                  onClose();
                })
                .catch((error) => {
                  console.log(error?.errorCode);
                  switch (error?.errorCode) {
                    case "ALREADY_HIGHER_MAX_BID":
                      setErrorMessage("Bid equal or below current max bid.");
                      break;
                    case "MAX_BID_LOWER_THAN_CURRENT_MAX":
                      setErrorMessage(
                        "Max bid must be larger than current bid."
                      );
                      break;
                    default:
                      setErrorMessage(
                        "Error processing bid. Please try again."
                      );
                      break;
                  }
                  setBidError(true);
                  setLoading(false);
                });
            }}
            sx={{
              backgroundColor: "#4646C7",
              height: 52,
              borderRadius: 4,
              fontFamily: mulish.style.fontFamily,
              "&:hover": {
                backgroundColor: " #ababf0",
                color: "white",
                transition: "all ease-out 0.35s",
              },
            }}
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                Confirm{" "}
                {formatDinero(
                  addPercentage(
                    dinero({
                      amount: selectedMaxBid,
                      currency: USD,
                    }),
                    1.25
                  )
                )}{" "}
                Max Bid
              </>
            )}
          </Button>

          <Box p={1} />

          <p className={styles.modalSpan}>
            All bids are binding and cannot be revoked.
          </p>

          <Box p={0.5} />
          {bidError ? (
            <InfoMessage
              value={errorMessage}
              className={styles.errorBid}
              secondary={true}
              icon={"info"}
            />
          ) : (
            <></>
          )}
        </div>
      </ModalDialog>
    </Modal>
  );
}
