import React from "react";
import { Box, IconButton, Typography, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        background: "#a41623",
        color: "white",
        justifyContent: "center",
      }}
    >
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5" paddingBottom={"10px"}>
          Opening hours
        </Typography>
        <Typography>Monday: 10am-7pm</Typography>
        <Typography>Tuesday: 10am-7pm</Typography>
        <Typography>Wednesday: 10am-7pm</Typography>
        <Typography>Thursday: 10am-7pm</Typography>
        <Typography>Friday: 10am-7pm</Typography>
        <Typography>Saturday: 10am-7pm</Typography>
        <Typography>Sunday: 10am-3pm</Typography>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5" paddingBottom={"10px"}>
          Contact us
        </Typography>
        <Typography>email: acmebakery@gmail.com</Typography>
        <Typography>phone: +44 71234567</Typography>
        <IconButton
          sx={{ color: "white" }}
          href="https://en.wikipedia.org/wiki/Facebook"
          target="_blank"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          sx={{ color: "white" }}
          href="https://en.wikipedia.org/wiki/Facebook"
          target="_blank"
        >
          <InstagramIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          padding: "20px",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button color="inherit" variant="text" href="/about">
          About
        </Button>
        <Button color="inherit" variant="text" href="/cookie">
          Cookie
        </Button>
        <Button color="inherit" variant="text" href="/cake">
          Cake
        </Button>
        <Button color="inherit" variant="text" href="/bread">
          Bread
        </Button>
        <Button color="inherit" variant="text" href="/special_bread">
          Special bread
        </Button>
      </Box>
    </Box>
  );
}

export default Footer;
