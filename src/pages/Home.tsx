import React from 'react'
import Header from '../components/Header'
import { Box, Typography } from '@mui/material'
import TempHeader from "../components/TempHeader"
import PromoCarousel from '../components/PromoCarousel'
import HomeCard from '../components/HomeCard'
import Footer from '../components/Footer'

function Home() {
    
  const data = [
    {   title: "Cookies",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus optio eveniet nam quibusdam enim itaque voluptatem nihil doloribus iusto cum at voluptas, sequi ipsum ducimus libero consequatur porro explicabo. Impedit illum deserunt fuga eligendi, accusantium minima assumenda soluta harum, reprehenderit debitis alias tempore esse. Ipsum nihil cupiditate numquam nobis?",
        buttonText: "Treat yourself today!",
        imgName: "cookie_square",
        href:"/cookie"
    },
    {   title: "Cakes",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus optio eveniet nam quibusdam enim itaque voluptatem nihil doloribus iusto cum at voluptas, sequi ipsum ducimus libero consequatur porro explicabo. Impedit illum deserunt fuga eligendi, accusantium minima assumenda soluta harum, reprehenderit debitis alias tempore esse. Ipsum nihil cupiditate numquam nobis?",
        buttonText: "Treat yourself today!",
        imgName: "cake_square",
        href:"/cake"
    },
    {   title: "Bread",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus optio eveniet nam quibusdam enim itaque voluptatem nihil doloribus iusto cum at voluptas, sequi ipsum ducimus libero consequatur porro explicabo. Impedit illum deserunt fuga eligendi, accusantium minima assumenda soluta harum, reprehenderit debitis alias tempore esse. Ipsum nihil cupiditate numquam nobis?",
        buttonText: "Treat yourself today!",
        imgName: "bread_square",
        href:"/bread"
    },
    {   title: "Special bread",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis minus optio eveniet nam quibusdam enim itaque voluptatem nihil doloribus iusto cum at voluptas, sequi ipsum ducimus libero consequatur porro explicabo. Impedit illum deserunt fuga eligendi, accusantium minima assumenda soluta harum, reprehenderit debitis alias tempore esse. Ipsum nihil cupiditate numquam nobis?",
        buttonText: "Treat yourself today!",
        imgName: "eggTart_square",
        href:"/special_bread"
    },


  ]
  return (
    <>
    <Header/>
    <PromoCarousel/>
    <Typography align='center' variant="h4" marginTop={"20px"}>What we offer</Typography>
    <Box sx={{display: "flex", width:"100%", justifyContent: "center", flexWrap: "wrap"}}>
        {data.map(({title, body, buttonText, imgName, href}) => <HomeCard key={title} title={title} body={body} buttonText={buttonText} imgName={imgName} href={href}/>)}
    </Box>
    <Footer/>
    </>
  )
}

export default Home