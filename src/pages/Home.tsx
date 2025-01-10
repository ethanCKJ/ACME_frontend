import React from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material'

function Home() {
  return (
    <>
    <Box sx={{display: "flex"}}>
        <Header/>
        <div>Home</div>
    </Box>
    </>
  )
}

export default Home