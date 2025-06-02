import React, {ReactNode, useState} from 'react'
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {TOKEN_KEY} from "../constants.ts";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface SidebarButtonProps {
  text: string,
  href: string,
  icon: ReactNode
}

interface SidebarProps{
  title: string,
}
const drawerWidth = 240;
function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(prevState => !prevState)
  }
  const handleLogout = () =>{
    localStorage.setItem(TOKEN_KEY,"")
    navigate("/")
  }
  const title = "Manage Orders"
  const SidebarButton = ({text, href, icon} : SidebarButtonProps) => (
      <ListItem key={text} disablePadding>
        <ListItemButton href={href}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
  )
  const token = localStorage.getItem(TOKEN_KEY)
  let roles = "";
  try {
    const jwt = jwtDecode(token)
    roles = jwt.roles;
  } catch {
    navigate("/login")
  }
  if (roles === ""){
    navigate("/login")
  }
  return (
      <>
        <AppBar position="static" sx={{height: "60px", display:"flex", justifyContent:"center"}}>
          <Toolbar>
            <Box display={"flex"} justifyContent={"flex-start"} padding={"20px"} flexGrow={1} alignItems={"center"}>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  edge="start"
                  sx={[
                    {
                      mr: "200px",
                    },
                  ]}
              >
                <MenuIcon/>
              </IconButton>
              <Typography fontWeight={"bold"} fontSize={"20px"}>{title}</Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
          {/*Drawer header*/}
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"flex-start", padding:"0px 30px", height:"60px"}} bgcolor={"primary"}>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon/>
              {/*{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}*/}
            </IconButton>
          </Box>
          <Divider />
          <List>
            <SidebarButton text={"Manage Orders"} href={"/manage_orders"} icon={<ShoppingCartOutlinedIcon/>}/>
            <SidebarButton text={"Add staff"} href={"/add_staff"} icon={<PersonAddAltOutlinedIcon/>}/>
            <SidebarButton text={"Manage products"} href={"/manage_products"} icon={<StorefrontOutlinedIcon/>}/>
          </List>
          <Divider />
          <Button variant="outlined" startIcon={<LogoutOutlinedIcon />} onClick={handleLogout}>
            Log out
          </Button>
        </Drawer>
      </>
  )
}

export default Sidebar
