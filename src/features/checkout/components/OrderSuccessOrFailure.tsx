import React from "react";
import { OrderStatus } from "../../../pages/CheckoutPage";
import { Box, Button, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";

/**
 * Displays successful order message with order details.
 * @param orderId
 * @param email
 * @param requiredDate
 * @constructor
 */
const SuccessScreen = ({
  orderId,
  email,
  requiredDate,
}: {
  orderId: number;
  email: string;
  requiredDate: string;
}) => (
  <Box
    sx={{
      background: "beige",
      width: "100%",
      height: "200px",
      textAlign: "center",
    }}
  >
    <Typography variant="h3">Successful Purchase!</Typography>
    <br />
    <Typography fontSize={"18px"}>Thank you for choosing ACME Bakery</Typography>
    <br />
    <Typography>{`Order reference #${orderId} sent to ${email}.`}</Typography>
    <Typography>{`You should receive your products by ${requiredDate}`}</Typography>
  </Box>
);

/**
 * Displays failure message when order could not be processed.
 * @constructor
 */
const FailureScreen = () => (
  <Box
    sx={{
      background: "beige",
      width: "100%",
      height: "200px",
      textAlign: "center",
    }}
  >
    <Typography variant="h3">Sorry!</Typography>
    <br />
    <Typography fontSize={"18px"}>We are experiencing technical difficulties.</Typography>
    <Typography fontSize={"18px"}>Please try ordering again some other time</Typography>
    <br />
    <Typography fontSize={"18px"}>You can contact support at support@acme.com</Typography>
  </Box>
);

interface ConfirmationProps {
  orderStatus: OrderStatus;
}

/**
 * Displays either success or failure screen based on whether the order was successful.
 * @param successMsg
 * @constructor
 */
function OrderSuccessOrFailure({ orderStatus }: ConfirmationProps) {
  const navigate = useNavigate();
  return (
    <>
      {orderStatus.isSuccess ? (
        <SuccessScreen
          orderId={orderStatus.orderId}
          email={orderStatus.email}
          requiredDate={orderStatus.requiredDate}
        />
      ) : (
        <FailureScreen />
      )}
      <Button variant="contained" onClick={() => navigate("/")}>
        Return to home
      </Button>
    </>
  );
}

export default OrderSuccessOrFailure;
