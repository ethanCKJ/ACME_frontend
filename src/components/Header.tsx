import { AppBar, Box, ButtonGroup, Toolbar, Button, Typography } from '@mui/material'
import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Header() {
    const buttonInfo =[
        {href: "/about", body: "About us"},
        {href: "/cookie", body: "Cookies"},
        {href: "/cake", body: "Cakes"},
        {href: "/bread", body: "Bread"},
        {href: "/special_bread", body: "Special bread"},
    ]
  return (

    <AppBar position="static">
        <Toolbar sx={{height: "60px"}}>
            <Box display={"flex"} justifyContent={"space-between"} flexGrow={1}>
                <a href="/">
                        <img src="/images/brand/LogoTransparent.webp" height={"58px"}/>
                    </a>
                <Box sx={{display: "flex", marginLeft: "20px"}} >
                    {buttonInfo.map(({href, body}, idx) => (<Button key={idx} variant="text" color="inherit" sx={{height:"60px", fontSize: "18px"}} href={href}>{body}</Button>))}
                </Box>
                <Button variant="outlined" color="inherit" endIcon={<AccountBoxIcon/>} sx={{marginLeft: "auto"}}>My Account</Button>
            </Box>
        </Toolbar>
    </AppBar>
    
    
  )
}

export default Header