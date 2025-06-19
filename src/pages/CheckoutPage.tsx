import {useEffect, useState} from 'react';
import {Box, Button, Step, StepLabel, Stepper, Typography} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginPanel from '../components/global/LoginPanel.tsx';
import CheckoutForm from '../components/checkout/CheckoutForm';
import CardForm from '../components/checkout/CardForm';
import Confirmation from "../components/checkout/Confirmation.tsx";
import {useAuth} from "../contexts/AuthContext";
import {Roles} from "../components/global/types";

export interface successMsg {
  "orderId": number,
  "email": string,
  "requiredDate": string
}

const steps = ["Login / Continue as guest", "Enter details", "Make payment", "Confirmation"]

function CheckoutPage() {
  const {role} = useAuth();
  const [minStep, setMinStep] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
        const newMinStep = (role === Roles.ROLE_CUSTOMER ? 1 : 0)
        if (activeStep < newMinStep) {
          setActiveStep(newMinStep)
        }
        setMinStep(newMinStep);
      },
      [role])
  const [successMsg, setSuccessMsg] = useState<successMsg>({
    email: "",
    orderId: 0,
    requiredDate: ""
  });
  const maxStep = 3;
  const handlePrevious = () => {
    if (activeStep > minStep) {
      setActiveStep((prev) => prev - 1)
    }
  }
  const handleNext = () => {
    if (activeStep < maxStep) {
      setActiveStep((prev) => prev + 1)
    }
  }
  return (
      <>
        {/* Header */}
        <Box sx={{
          width: "100%",
          height: "60px",
          backgroundColor: "darkblue",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          alignItems: "center"
        }}>
          <Button variant="contained" href="/cart" startIcon={<ArrowBackIcon/>}
                  sx={{margin: "0px 0px 0px 0px", position: "absolute", left: "20px"}}>Back to
            basket</Button>
          <Typography sx={{color: "white", fontSize: "40px"}}>Secure checkout</Typography>
        </Box>
        {/* Main body */}
        <Box sx={{display: "flex", justifyContent: "center"}}>
          {/* The stepper */}
          <Box sx={{padding: "20px", width: "600px", display: "flex", flexDirection: "column"}}>
            <Stepper activeStep={activeStep}>
              {steps.map((value, index) => {
                return (
                    <Step key={index} completed={index < activeStep}>
                      <StepLabel><Typography fontSize={"16px"}>{value}</Typography></StepLabel>
                    </Step>)
              })}
            </Stepper>
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
              height: "30px"
            }}>
              <Button variant='contained' disabled={activeStep === 0}
                      onClick={handlePrevious}>Previous</Button>
            </Box>
            <Box sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "40px",
              flexDirection: "column",
              gap: 1
            }}>
              {activeStep === 0 ? <>
                <LoginPanel/>
                <Button variant='outlined' onClick={handleNext}>Checkout as guest</Button>
              </> : null}
              {activeStep === 1 ? <CheckoutForm handleNext={handleNext}/> : null}
              {activeStep === 2 ?
                  <CardForm handleNext={handleNext} setSuccessMsg={setSuccessMsg}/> : null}
              {activeStep === 3 ? <Confirmation successMsg={successMsg}/> : null}
            </Box>
          </Box>
        </Box>

      </>
  )
}

export default CheckoutPage