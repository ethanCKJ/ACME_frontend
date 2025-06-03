import React from 'react'
import { Card, CardContent, Typography, Box, Button, useTheme } from '@mui/material'

interface HomeCardProps {
    title: string;
    body: string;
    buttonText: string;
    href: string;
    imgName: string;
}
function HomeCard({title, body, buttonText, href, imgName}:HomeCardProps) {
  const theme = useTheme();
  return (
    <Card sx={{display: "flex", width: "650px", margin:"10px", padding: "10px"}}>
        {/* Handles the up-down of the text and button */}
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Typography variant="h4">
                {title}
            </Typography>
            <Typography variant="body1" sx={{height:"180px"}}>
                {body}
            </Typography>
            <Button color="primary" variant="contained" href={href} sx={{width: "220px", textAlign: "left", marginTop: "20px"}}>
                {buttonText}
            </Button>
        </Box>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10px "}}>
            <img src={`/images/homepage/${imgName}.webp`}></img>
        </Box>
    </Card>
  )
}

export default HomeCard