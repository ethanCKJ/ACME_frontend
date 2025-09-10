import React from "react";
import { successMsg } from "../../pages/CheckoutPage";
import { Box, Button, Typography } from "@mui/material";

interface ConfirmationProps {
  successMsg: successMsg;
}
function Confirmation({ successMsg }: ConfirmationProps) {
  const SuccessScreen = () => (
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
      <Typography fontSize={"18px"}>
        Thank you for choosing ACME Bakery
      </Typography>
      <br />
      <Typography>{`Order reference #${successMsg.orderId} sent to ${successMsg.email}.`}</Typography>
      <Typography>{`You should receive your products by ${successMsg.requiredDate}`}</Typography>
    </Box>
  );
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
      <Typography fontSize={"18px"}>
        We are experiencing technical difficulties.
      </Typography>
      <Typography fontSize={"18px"}>
        Please try ordering again some other time
      </Typography>
      <br />
      <Typography fontSize={"18px"}>
        You can contact support at support@acme.com
      </Typography>
    </Box>
  );
  return (
    <>
      {successMsg.email !== "" ? <SuccessScreen /> : <FailureScreen />}
      <Button variant="contained" href={"/"}>
        Return to home
      </Button>
    </>
  );
}

export default Confirmation;
