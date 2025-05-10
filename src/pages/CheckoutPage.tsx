import React from 'react'
import { useState } from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginPanel from '../components/LoginPanel';

const steps = ["Login / Continue as guest", "Enter details", "Make payment"]
function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const maxStep = 2;
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
            <Button variant='contained' disabled={activeStep === maxStep} onClick={handleNext}>Next</Button>
      </Box>
      <Box sx={{display:"flex", justifyContent:"center", marginTop:"20px"}}>

        {activeStep === 0 ? <LoginPanel/> : null}
      </Box>
    </Box>
    </Box>

    </>
  )
}

export default CheckoutPage