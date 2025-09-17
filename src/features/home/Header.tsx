import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { Roles } from "../../types/types";
import { useNavigate } from "react-router-dom";

const buttonInfo = [
  { link: "/cookie", body: "Cookies" },
  { link: "/cake", body: "Cakes" },
  { link: "/bread", body: "Bread" },
  { link: "/special_bread", body: "Special bread", width: "100px" },
];

function CustomerMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Button
        variant="outlined"
        endIcon={<AccountBoxIcon />}
        color="inherit"
        sx={{ width: "160px" }}
        onClick={handleClick}
      >
        My Account
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        sx={{
          "& .MuiMenu-list": { width: "160px" },
          "& .MuiMenuItem-root": { paddingTop: "8px", paddingBottom: "8px" },
        }}
      >
        <MenuItem>
          <AccountBoxIcon sx={{ marginRight: "5px" }} /> My details
        </MenuItem>
        <MenuItem>
          <LocalShippingIcon sx={{ marginRight: "5px" }} /> My orders
        </MenuItem>
        <MenuItem onClick={logout}>
          <LogoutIcon sx={{ marginRight: "5px" }} /> Log out
        </MenuItem>
      </Menu>
    </>
  );
}

function CartButton(props: { onClick: () => void; cartCount: number }) {
  return (
    <Button
      variant="outlined"
      color="inherit"
      sx={{
        width: "135px",
        justifyContent: "space-between",
        padding: "0px 5px 0px 5px",
        display: "flex",
      }}
      onClick={props.onClick}
    >
      <Typography variant="h5" textAlign={"center"} flexGrow={1}>
        {props.cartCount}
      </Typography>
      <Box
        sx={{
          width: "80px",
          padding: "0px",
          alignItems: "start",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography fontSize="14px">My Cart</Typography>
        <ShoppingCartOutlinedIcon />
      </Box>
    </Button>
  );
}

function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { role, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar sx={{ height: "60px" }}>
        <Box display={"flex"} justifyContent={"space-between"} flexGrow={1}>
          {/* Company logo that when clicked navigates to home page */}
          <a onClick={() => navigate("/")}>
            <img
              src="/images/brand/LogoTransparent.webp"
              height={"58px"}
              alt={"Home"}
            />
          </a>
          {/* Buttons for product pages of each product category */}
          <Box sx={{ display: "flex", marginLeft: "0px", marginRight: "auto" }}>
            {buttonInfo.map(({ link, body, width }) => (
              <Button
                key={link}
                variant="text"
                color="inherit"
                sx={{
                  height: "60px",
                  fontSize: "18px",
                  width: { width },
                  textAlign: "center",
                  lineHeight: "20px",
                }}
                onClick={() => navigate(link)}
              >
                {body}
              </Button>
            ))}
          </Box>

          {/* My cart and login/manage account buttons */}
          <ButtonGroup>
            <CartButton
              onClick={() => {
                if (cartCount > 0) {
                  navigate("/cart");
                }
              }}
              cartCount={cartCount}
            />

            {/* Manage account */}
            {role === Roles.ROLE_CUSTOMER ? <CustomerMenu /> : null}
            {role === Roles.ROLE_STAFF || role === Roles.ROLE_ADMIN ? (
              <Button
                variant="outlined"
                endIcon={<AccountBoxIcon />}
                color="inherit"
                sx={{ width: "160px" }}
                onClick={logout}
              >
                Log out
              </Button>
            ) : null}
            {role === Roles.UNAUTHENTICATED ? (
              <Button
                variant="outlined"
                endIcon={<AccountBoxIcon />}
                color="inherit"
                sx={{ width: "160px" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            ) : null}
          </ButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
