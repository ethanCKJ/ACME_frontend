import React, {useState} from "react";
import {Box, Button, Card, FormControl, FormLabel, TextField, Typography,} from "@mui/material";
import api from "../../../utils/api";
import {jwtDecode} from "jwt-decode";
import {useCheckout} from "../../../contexts/CheckoutContext";
import {CustomJwtPayload, useAuth} from "../../../contexts/AuthContext";
import {Roles} from "../../../types/types";
import {Link, useLocation, useNavigate} from "react-router-dom";

interface LoginPanelProps {
  allowedRoles: Roles[];
  onStaffLoginSuccess?: () => void;
  onCustomerLoginSuccess?: () => void;
}

/**
 * Login panel for getting JWT token, populating profile info depending on role
 * and redirecting to previous page or a defined page based on role.
 *
 * @param allowedRoles list of allowed roles to login from this panel. A valid login for a role not in allowedRoles is treated as failed login.
 * @constructor
 */
function LoginPanel({ allowedRoles, onStaffLoginSuccess, onCustomerLoginSuccess }: LoginPanelProps) {
  const [passwordError, setPasswordError] = useState(false);
  const { setCheckoutData } = useCheckout();
  const { login} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const username = formdata.get("email")?.valueOf();
    const password = formdata.get("password")?.valueOf();

    try {
      const res = await api.post("/token", { username, password });
      const token = res.data;
      const jwt: CustomJwtPayload = jwtDecode(token);
      const currentRole = Roles[jwt.roles ?? "UNAUTHENTICATED"];
      if (allowedRoles.includes(currentRole)){
        login(token);
        // If logged in a customer, fetch customer profile info and populate checkout context.
        if (currentRole === Roles.ROLE_CUSTOMER) {
          try {
            const userRes = await api.get("me/customer_profile_info");
            setCheckoutData({
              customerId: jwt.id,
              email: jwt.sub,
              ...userRes.data,
            });
            if (onCustomerLoginSuccess) {
              onCustomerLoginSuccess();
            }
          } catch (e) {
            alert(e);
            setPasswordError(true);
          }

        }
        else if (currentRole === Roles.ROLE_ADMIN || currentRole === Roles.ROLE_STAFF) {
          // If staff, navigate to manage orders page
          onStaffLoginSuccess();
        }
      } else {
        setPasswordError(true);
      }

    } catch (err) {
      console.error(err);
      setPasswordError(true);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        width: "400px",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography fontSize="32px" fontWeight="bold">
        Sign In
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          "& .MuiFormLabel-root": { color: "black" },
        }}
        onSubmit={handleSubmit}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            required
            autoFocus
            variant="outlined"
            sx={{ "& .MuiInputBase-input": { padding: 1 } }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            id="password"
            type="password"
            name="password"
            autoComplete="password"
            autoFocus
            required
            variant="outlined"
            error={passwordError}
            helperText={
              passwordError ? "No matching email and password found for the role" : ""
            }
            sx={{ "& .MuiInputBase-input": { padding: 1 } }}
          />
        </FormControl>
        <Button variant="contained" type="submit">
          Sign in
        </Button>
        <Typography>
          Don&apos;t have an account?{" "}
          {/* Store pathname to navigate back to /checkout if entering signup via /checkout. Otherwise prevPathname is usually /login
          in that case navigate to home / */}
          <Link to="/customer/signup" state={{ prevPathname: location.pathname }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}

export default LoginPanel;
