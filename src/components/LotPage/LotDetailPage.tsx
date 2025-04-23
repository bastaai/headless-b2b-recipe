import styles from "../Pages/LotDetailPage.module.css";

import { useState } from "react";
import {
  ItemStatus,
  BidStatus,
  SaleStatus,
  Get_SaleQuery,
} from "src/types/graphql";
import { calculateNextBidAsk } from "src/utils/auctions";
import { Button } from "../Button";
import { MaxBidSelect } from "../MaxBidSelect";
import { BidHistory } from "../BidHistory";
import { ModalEmailVerify } from "../ModalScreens/ModalEmailVerify";
import { ModalVerify } from "../ModalScreens/ModalVerify";
import LoadingSpinner from "../Spinner";
import Image from "next/image";
import { Box, Card, Container, Grid, useTheme } from "@mui/joy";
import { USD } from "@dinero.js/currencies";
import { dinero } from "dinero.js";
import { formatDinero } from "src/utils/dinerojs";
import ModalConfirmBid from "../ModalScreens/ModalConfirmBid";
import { SaleStatusLine } from "./SaleStatusLine";
import { useSession } from "next-auth/react";

type LotDetailPageProps = {
  openSignInModal: () => void;
  sale: Get_SaleQuery["sale"];
  item: Get_SaleQuery["sale"]["items"]["edges"][0]["node"];
  bidderToken: string | null;
  placeMaxBid(saleId: string, itemId: string, maxAmount: number): Promise<void>;
};

const LotDetailPage = ({
  sale,
  bidderToken,
  item,
  placeMaxBid,
  openSignInModal,
}: LotDetailPageProps) => {
  // Authentication session
  const theme = useTheme();

  // User Profile
  const session = useSession();

  // Local state
  const [loading, setLoading] = useState(false);

  // Is bidding enabled
  const biddingEnabled = [ItemStatus.ItemClosing, ItemStatus.ItemOpen].includes(
    item.status
  );

  // Error reported by server when bidding

  const [selectedMaxBid, setSelectedMaxBid] = useState(
    calculateNextBidAsk(item)
  );
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);
  const [showConfirmBidModal, setShowConfirmBidModal] = useState(false);

  // We expect a single lot, where the sale is a single lot.
  const lot = sale.items.edges[0].node;

  // Number of placed bids by the logged in user
  const numberOfPlacedBids = lot.userBids.length;

  // Latest bid that the logged in user placed
  const latestMaxBid =
    numberOfPlacedBids > 0
      ? lot.userBids[numberOfPlacedBids - 1].maxAmount
      : undefined;

  // Formatted max amount of the latest bid that the logged in user placed.
  const formattedLatestMaxBid = latestMaxBid
    ? formatDinero(
        dinero({
          amount: latestMaxBid ?? 0,
          currency: USD,
        })
      )
    : undefined;

  // Is loggedin user participating in sale
  const isParticipating =
    item.bidStatus === BidStatus.Winning || item.bidStatus === BidStatus.Losing;

  const currentActiveBid = lot.currentBid ? lot.currentBid : 0;
  let highestUserMaxBid = 0;
  lot.userBids.forEach((userBid) => {
    if (userBid.maxAmount) {
      if (userBid.maxAmount > highestUserMaxBid) {
        highestUserMaxBid = userBid.maxAmount;
      }
    }
  });
  // Next Ask Options
  const nextAskOptions = item.nextAsks
    .filter((ask) => ask > currentActiveBid) // Filter out asks that is less than current max bid.
    .filter((ask) => ask > highestUserMaxBid)
    .map((ask) => {
      return {
        value: ask.toString(),
        label: formatDinero(
          dinero({
            amount: ask ?? 0,
            currency: USD,
          })
        ),
      };
    });

  /**
   *  Bidding controls for when auction is not closed.
   */
  const BiddingControls = () => {
    return (
      <>
        {/* If sale is in any other status that publish, show starting or current bid otherwise a CTA button to login */}
        {sale.status !== SaleStatus.Published && (
          <div className={styles.innerBlock}>
            <div className={styles.currentBidBlock}>
              {item.bids.length === 0 && item.startingBid ? (
                <span>
                  Bidding starts at:{" "}
                  {formatDinero(
                    dinero({
                      amount: item.startingBid ?? 0,
                      currency: USD,
                    })
                  )}
                </span>
              ) : (
                <span>
                  Current bid is{" "}
                  {formatDinero(
                    dinero({
                      amount: item.currentBid ?? 0,
                      currency: USD,
                    })
                  )}
                </span>
              )}
            </div>
          </div>
        )}

        {/* If a user is logged and the sale is open for bidding, otherwise show register button */}
        <div className={styles.innerBlock}>
          {biddingEnabled ? (
            <div className={styles.bidBlock}>
              <div className={styles.bidSelect}>
                <MaxBidSelect
                  id={"max-bid-select"}
                  title="Select max bid"
                  disabled={false}
                  onChange={function (newValue: string): void {
                    newValue && setSelectedMaxBid(Number(newValue));
                  }}
                  options={nextAskOptions}
                  currency={sale.currency || "USD"}
                  placeholder={"Select your max bid"}
                />
              </div>

              <div className={styles.bidButton}>
                <Button
                  onClick={() => {
                    setLoading(true);
                    const isLoggedIn = session.status === "authenticated";
                    const isVerifiedAndLoggedIn =
                      session.data?.user?.isVerified && isLoggedIn;
                    const hasBidderToken = bidderToken !== null;

                    if (!isLoggedIn) {
                      openSignInModal();
                      setLoading(false);
                      return;
                    }

                    if (!isVerifiedAndLoggedIn) {
                      setShowEmailVerificationModal(true);
                      setLoading(false);
                      return;
                    }

                    if (!hasBidderToken) {
                      alert("Error: No bidder token");
                      setLoading(false);
                      return;
                    }

                    setShowConfirmBidModal(true);
                  }}
                  enabled={true}
                >
                  <div className={styles.place_bid_inner_button}>
                    {loading ? <LoadingSpinner /> : "Place Bid"}
                  </div>
                </Button>
              </div>
            </div>
          ) : session == null ? (
            <div className={styles.innerBlock}>
              <div className={styles.currentBidBlock}></div>
            </div>
          ) : !session.data?.user?.isVerified ? (
            <div className={styles.innerBlock}>
              <div className={styles.currentBidBlock}>
                <h2>Please verify your email address</h2>
                <p>Check your email for a verification link.</p>
              </div>
            </div>
          ) : (
            <div className={styles.innerBlock}>
              <div className={styles.currentBidBlock}>
                <h2>You have been registered!</h2>
                <p>We will notify you when the auction starts.</p>
              </div>
            </div>
          )}
        </div>

        {/* If user is participating in sale we show info on bid status */}
        {isParticipating && (
          <div className={styles.innerBlock}>
            {(() => {
              switch (item.bidStatus) {
                case BidStatus.Winning:
                  return (
                    <div
                      className={`${styles.bidInfoBlock} ${styles.bidInfoWinning}`}
                    >
                      <div>You have the winning bid</div>
                      <div className={styles.yourMaxBid}>
                        Your max bid: {formattedLatestMaxBid}
                      </div>
                    </div>
                  );
                case BidStatus.Losing:
                  return (
                    <div
                      className={`${styles.bidInfoBlock} ${styles.bidInfoLosing}`}
                    >
                      <div>You have been outbid</div>
                      <div className={styles.yourMaxBid}>
                        Your max bid: {formattedLatestMaxBid}
                      </div>
                    </div>
                  );
              }
            })()}
          </div>
        )}
      </>
    );
  };

  const BiddingResults = () => (
    <>
      {item.bidStatus === BidStatus.Won ? (
        <>
          <div className={styles.innerBlock}>
            <h2>Congratulations!</h2>
            <p>
              You will be contacted today by a member of the David Lynch
              Foundation to process your bid fee.
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className={styles.innerBlock}>
        <div className={styles.currentBidBlock}>
          Winning bid is{" "}
          {formatDinero(
            dinero({
              amount: item.currentBid ?? 0,
              currency: USD,
            })
          )}
        </div>
      </div>
    </>
  );

  const imageUrl =
    item.images?.length > 0 && item.images[0].url
      ? `${item.images[0].url}?w=600&h=600&fit=crop`
      : `https://placehold.co/600x600?text=No+Image&font=roboto`;

  return (
    <>
      <Container>
        <Grid container spacing={4}>
          <Grid xs={12} sm={12} md={6}>
            <SaleStatusLine sale={sale} />
            <h1>{sale.title}</h1>
            <p>{sale.description}</p>

            {/* Show bidding controls or sale results */}
            {sale.status !== SaleStatus.Closed
              ? BiddingControls()
              : BiddingResults()}
            {sale.status !== SaleStatus.Published && (
              <>
                <Box paddingTop={2} paddingBottom={1}>
                  <span
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Live bidding ({item.bids.length})
                  </span>
                </Box>

                <Card
                  sx={{
                    backgroundColor: "#F7F7FE",
                    color: "var(--color-main-dark-blue)",
                    boxShadow: "none",
                  }}
                >
                  <BidHistory bids={item.bids} userBids={item.userBids} />
                </Card>
              </>
            )}
          </Grid>
          <Grid
            xs={1}
            sm={1}
            md={1}
            sx={{
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
          ></Grid>
          <Grid xs={12} md={5}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: "600px",
              }}
            >
              <Image
                src={imageUrl}
                alt={"profile picture"}
                fill
                style={{
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                priority
              />
            </Box>
          </Grid>
          <Box
            p={2.5}
            width={"100%"}
            sx={{
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
          />
        </Grid>
      </Container>

      {/* Modal for ID verification */}
      <ModalVerify
        isOpen={showVerificationModal}
        onClose={() => {
          setShowVerificationModal(false);
          //location.reload();
        }}
      />

      {/* Modal for email verification */}
      <ModalEmailVerify
        isOpen={showEmailVerificationModal}
        emailVerified={session.data?.user?.isVerified !== undefined}
        onClose={() => {
          setShowEmailVerificationModal(false);
        }}
      />

      {/* Modal for confirm bid */}
      <ModalConfirmBid
        isOpen={showConfirmBidModal}
        onClose={() => {
          setShowConfirmBidModal(false);
          setLoading(false);
        }}
        placeMaxBid={placeMaxBid}
        sale={sale}
        item={item}
        selectedMaxBid={selectedMaxBid}
      />
    </>
  );
};

export default LotDetailPage;
