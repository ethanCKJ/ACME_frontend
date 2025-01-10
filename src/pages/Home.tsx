import React from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material'
import TempHeader from "../components/TempHeader"
import PromoCarousel from '../components/PromoCarousel'

function Home() {
  return (
    <>
    <Header/>
    <PromoCarousel/>
    <p>Home</p>
    </>
  )
}

export default Home