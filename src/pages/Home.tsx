import React from 'react'
import Header from '../components/home/Header'
import { Box, Typography } from '@mui/material'
import PromoCarousel from '../components/home/PromoCarousel'
import HomeCard from '../components/home/HomeCard'
import Footer from '../components/home/Footer'


function Home() {

  const data = [
    {
      title: "Cookies",
      body: "Freshly baked cookies in classic and gourmet flavors, perfect for any sweet craving.",
      buttonText: "Treat yourself today!",
      imgName: "cookie_square",
      href: "/cookie"
    },
    {
      title: "Cakes",
      body: "Handcrafted cakes for celebrations and everyday indulgence, made with premium ingredients daily.",
      buttonText: "Treat yourself today!",
      imgName: "cake_square",
      href: "/cake"
    },
    {
      title: "Bread",
      body: "Artisan breads baked fresh every morning using traditional recipes and finest quality flour.",
      buttonText: "Treat yourself today!",
      imgName: "bread_square",
      href: "/bread"
    },
    {
      title: "Special bread",
      body: "Delicate pastries and specialty baked goods featuring flaky crusts and rich, creamy fillings.",
      buttonText: "Treat yourself today!",
      imgName: "eggTart_square",
      href: "/special_bread"
    },
  ]
  return (
    <>
    <Box sx={{backgroundColor: "beige"}}>
      <Header/>
      <PromoCarousel />
      <Typography align='center' variant="h4" marginTop={"20px"}>What we offer</Typography>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center", flexWrap: "wrap"}}>
        {data.map(({ title, body, buttonText, imgName, href }) => <HomeCard key={title} title={title} body={body} buttonText={buttonText} imgName={imgName} href={href} />)}
      </Box>
    </Box>
    <Footer />
    </>
  )
}

export default Home