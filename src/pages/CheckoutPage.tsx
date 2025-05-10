import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CheckoutPage() {
  return (
    <>
    {/* Header */}
    <Box sx={{width:"100%", height:"60px", backgroundColor:"grey", textAlign:"center"}}>
      <Typography sx={{color:"white"}} variant="h3">Secure checkout</Typography>
    </Box>
    <Box sx={{padding:"20px"}}>
      <Button variant="contained" href="/cart" startIcon={<ArrowBackIcon/>} sx={{margin: "0px 0px 20px 0px"}}>Back to basket</Button>
      <Box sx={{display:"flex", }}>

      </Box>
    </Box>

    </>
  )
}

export default CheckoutPage