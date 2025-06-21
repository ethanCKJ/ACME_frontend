import React from 'react'
import {Box, Button, Card, Typography} from '@mui/material'
import {useNavigate} from "react-router-dom";

interface HomeCardProps {
    title: string;
    body: string;
    buttonText: string;
    link: string;
    imgName: string;
}
function HomeCard({title, body, buttonText, link, imgName}:HomeCardProps) {
  const navigate = useNavigate();
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
            <Button color="primary" variant="contained" onClick={() => navigate(link)} sx={{width: "220px", textAlign: "left", marginTop: "20px"}}>
                {buttonText}
            </Button>
        </Box>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10px "}}>
            <img src={`/images/homepage/${imgName}.webp`} alt={title}></img>
        </Box>
    </Card>
  )
}

export default HomeCard