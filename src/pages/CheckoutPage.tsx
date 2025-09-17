import {useEffect, useState} from "react";
import {Box, Button, Step, StepLabel, Stepper, Typography,} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginPanel from "../features/auth/component/LoginPanel";
import CheckoutForm from "../features/checkout/components/CheckoutForm";
import CardForm from "../features/checkout/components/CardForm";
import OrderSuccessOrFailure from "../features/checkout/components/OrderSuccessOrFailure";
import {useAuth} from "../contexts/AuthContext";
import {Roles} from "../types/types";
import {useCheckoutStepping} from "../features/checkout/util/useCheckoutStepping";

export interface OrderStatus {
  orderId: number;
  email: string;
  requiredDate: string;
  isSuccess: boolean;
}

const steps = [
  "Login / Continue as guest",
  "Enter details",
  "Make payment",
  "Confirmation",
];

/**
 * Page handle full checkout flow
 * 1. sign in or continue as guest
 * 2. enter shipping and billing details
 * 3. make payment
 * 4. order confirmation
 * @constructor
 */
function CheckoutPage() {
  const { role } = useAuth();
  const {activeStep, handlePrevious, handleNext, disableStep } = useCheckoutStepping({maxStep: 3});

  // When order is submitted, the order status is stored here to be displayed on the confirmation step
  const [orderStatus, setOrderStatus] = useState<OrderStatus>({
    email: "",
    orderId: 0,
    requiredDate: "",
    isSuccess: false,
  });
  // When logged in, make 0 a disabled step which moves the user to step 1.
  const onCustomerLoginSuccess = () => {
    disableStep(0);
  }

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          width: "100%",
          height: "60px",
          backgroundColor: "darkblue",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          href="/cart"
          startIcon={<ArrowBackIcon />}
          sx={{ margin: "0px 0px 0px 0px", position: "absolute", left: "20px" }}
        >
          Back to basket
        </Button>
        <Typography sx={{ color: "white", fontSize: "40px" }}>
          Secure checkout
        </Typography>
      </Box>
      {/* Main body */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {/* The stepper */}
        <Box
          sx={{
            padding: "20px",
            width: "600px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((value, index) => {
              return (
                <Step key={index} completed={index < activeStep}>
                  <StepLabel>
                    <Typography fontSize={"16px"}>{value}</Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
              height: "30px",
            }}
          >
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={handlePrevious}
            >
              Previous
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "40px",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {activeStep === 0 ? (
              <>
                <LoginPanel allowedRoles={[Roles.ROLE_CUSTOMER]} onCustomerLoginSuccess={onCustomerLoginSuccess}/>
                <Button variant="outlined" onClick={handleNext}>
                  Checkout as guest
                </Button>
              </>
            ) : null}
            {activeStep === 1 ? <CheckoutForm handleNext={handleNext} /> : null}
            {activeStep === 2 ? (
              <CardForm handleNext={handleNext} setSuccessMsg={setOrderStatus} />
            ) : null}
            {activeStep === 3 ? <OrderSuccessOrFailure orderStatus={orderStatus} /> : null}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CheckoutPage;
