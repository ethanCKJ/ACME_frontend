import React from 'react'
import { useState } from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel, Link } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginPanel from '../components/checkout/LoginPanel';
import CheckoutForm from '../components/checkout/CheckoutForm';
import CardForm from '../components/checkout/CardForm';

const steps = ["Login / Continue as guest", "Enter details", "Make payment", "Confirmation"]
function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const maxStep = 3;
  const handlePrevious = () => {
    if (activeStep > 0){
      setActiveStep((prev) => prev - 1)
    }
  }
  const handleNext = () => {
    if (activeStep < maxStep){
      setActiveStep((prev) => prev + 1)
    }
  }
  return (
    <>
    {/* Header */}
    <Box sx={{width:"100%", height:"60px", backgroundColor:"darkblue", display:"flex", justifyContent:"center", position:"relative", alignItems:"center"}}>
      <Button variant="contained" href="/cart" startIcon={<ArrowBackIcon/>} sx={{margin: "0px 0px 0px 0px", position:"absolute", left:"20px"}}>Back to basket</Button>
      <Typography sx={{color:"white", fontSize:"40px"}}>Secure checkout</Typography>
    </Box>
    {/* Main body */}
    <Box sx={{display:"flex", justifyContent:"center"}}>
      {/* The stepper */}
      <Box sx={{padding:"20px", width:"600px", display:"flex", flexDirection:"column"}}>
          <Stepper activeStep={activeStep}>
            {steps.map((value, index) => {
              return (
              <Step key={index} completed={index < activeStep}>
                  <StepLabel><Typography fontSize={"16px"}>{value}</Typography></StepLabel>
              </Step>)
            })}
          </Stepper>
          <Box sx={{display:"flex", justifyContent:"space-between", marginTop:"10px", height:"30px"}}>
            <Button variant='contained' disabled={activeStep === 0} onClick={handlePrevious}>Previous</Button>
      </Box>
      <Box sx={{display:"flex", alignItems:"center", marginTop:"40px", flexDirection:"column", gap:1}}>
        {activeStep === 0 ? <>
        <LoginPanel/>
        <Button variant='outlined' onClick={handleNext}>Checkout as guest</Button>
        </> : null}
        {activeStep === 1 ? <CheckoutForm handleNext={handleNext}/> : null}
        {activeStep === 2 ? <CardForm handleNext={handleNext}/> : null}
      </Box>
    </Box>
    </Box>

    </>
  )
}

export default CheckoutPage