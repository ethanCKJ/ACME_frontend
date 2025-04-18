import { AppBar, Box, ButtonGroup, Toolbar, Button, Typography } from '@mui/material'
import React from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '../contexts/CartContext';

function Header() {
    const {cartCount} = useCart()
    const buttonInfo =[
        {href: "/about", body: "About us", width:"80px"},
        {href: "/cookie", body: "Cookies"},
        {href: "/cake", body: "Cakes"},
        {href: "/bread", body: "Bread"},
        {href: "/special_bread", body: "Special bread", width:"100px"},
    ]
    
  return (
    <AppBar position="static">
        <Toolbar sx={{height: "60px"}}>
            <Box display={"flex"} justifyContent={"space-between"} flexGrow={1}>
                <a href="/">
                        <img src="/images/brand/LogoTransparent.webp" height={"58px"}/>
                    </a>
                <Box sx={{display: "flex", marginLeft: "0px", marginRight: "auto"}} >
                    {buttonInfo.map(({href, body, width}, idx) => (<Button key={idx} variant="text" color="inherit" sx={{height:"60px", fontSize: "18px", width:{width}, textAlign:"center", lineHeight:"20px"}} href={href}>{body}</Button>))}
                </Box>
                <ButtonGroup>
                    <Button variant="outlined" color="inherit" sx={{width:"135px", justifyContent:"space-between", padding: "0px 5px 0px 5px", display:"flex"}}>
                        <Typography variant="h5" textAlign={"center"} flexGrow={1}>{cartCount}</Typography>
                        <Box sx={{width:"80px", fontSize:"14px", padding:"0px", alignItems:"start", display:"flex", flexDirection:"column"}}>
                         <Typography>My Cart</Typography>
                         <ShoppingCartOutlinedIcon />
                        </Box>
                    </Button>
                    <Button variant="outlined" color="inherit" endIcon={<AccountBoxIcon/>} sx={{width:"100px"}}>Login</Button>
                </ButtonGroup>
            </Box>
        </Toolbar>
    </AppBar>
    
    
  )
}

export default Header