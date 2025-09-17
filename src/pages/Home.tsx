import React from "react";
import Header from "../features/home/Header";
import { Box, Typography } from "@mui/material";
import PromoCarousel from "../features/home/PromoCarousel";
import HomeCard from "../features/home/HomeCard";
import Footer from "../features/home/Footer";

const data = [
  {
    title: "Cookies",
    body: "Freshly baked cookie in classic and gourmet flavors, perfect for any sweet craving.",
    buttonText: "Treat yourself today!",
    imgName: "cookie_square",
    href: "/cookie",
  },
  {
    title: "Cakes",
    body: "Handcrafted cakes for celebrations and everyday indulgence, made with premium ingredients daily.",
    buttonText: "Treat yourself today!",
    imgName: "cake_square",
    href: "/cake",
  },
  {
    title: "Bread",
    body: "Artisan breads baked fresh every morning using traditional recipes and finest quality flour.",
    buttonText: "Treat yourself today!",
    imgName: "bread_square",
    href: "/bread",
  },
  {
    title: "Special bread",
    body: "Delicate pastries and specialty baked goods featuring flaky crusts and rich, creamy fillings.",
    buttonText: "Treat yourself today!",
    imgName: "eggTart_square",
    href: "/special_bread",
  },
];

function Home() {
  return (
    <>
      <Box sx={{ backgroundColor: "beige" }}>
        <Header />
        <PromoCarousel />
        <Typography align="center" variant="h4" marginTop={"20px"}>
          What we offer
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {data.map(({ title, body, buttonText, imgName, href: link }) => (
            <HomeCard
              key={title}
              title={title}
              body={body}
              buttonText={buttonText}
              imgName={imgName}
              link={link}
            />
          ))}
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Home;
