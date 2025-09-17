import React, { ReactNode, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Roles } from "../types/types";

interface SidebarButtonProps {
  text: string;
  href: string;
  icon: ReactNode;
}

interface SidebarProps {
  title: string;
}

const drawerWidth = 240;

function Sidebar({ title }: SidebarProps) {
  const { logout, role } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const SidebarButton = ({ text, href, icon }: SidebarButtonProps) => (
    <ListItem key={text} disablePadding>
      <ListItemButton href={href}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
  return (
    <>
      <AppBar
        position="static"
        sx={{ height: "60px", display: "flex", justifyContent: "center" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={[
              {
                ml: "6px",
              },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Box
            display={"flex"}
            justifyContent={"flex-start"}
            padding={"20px"}
            flexGrow={1}
            alignItems={"center"}
          >
            <Typography
              sx={{ marginLeft: "200px" }}
              fontWeight={"bold"}
              fontSize={"20px"}
            >
              {title}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {/*Drawer header*/}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0px 30px",
            height: "60px",
          }}
          bgcolor={"primary"}
        >
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <SidebarButton
            text={"Manage Orders"}
            href={"/manage_orders"}
            icon={<ShoppingCartOutlinedIcon />}
          />
          {role === Roles.ROLE_ADMIN ? (
            <>
              <SidebarButton
                text={"Add staff"}
                href={"/add_staff"}
                icon={<PersonAddAltOutlinedIcon />}
              />
              <SidebarButton
                text={"Manage products"}
                href={"/manage_products"}
                icon={<StorefrontOutlinedIcon />}
              />
            </>
          ) : null}
        </List>
        <Divider />
        <Button
          variant="outlined"
          startIcon={<LogoutOutlinedIcon />}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </Drawer>
    </>
  );
}

export default Sidebar;
