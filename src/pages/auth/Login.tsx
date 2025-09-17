import Header from "../../features/home/Header";
import LoginPanel from "../../features/auth/component/LoginPanel";
import {Box, Button, Typography} from "@mui/material";
import {useState} from "react";
import {Roles} from "../../types/types";
import {useNavigate} from "react-router-dom";

function Login() {
  const [staffLogin, setStaffLogin] = useState(false);
  const navigate = useNavigate();
  const onStaffLoginSuccess = () => {
    navigate("/manage_orders")
  }
  const onCustomerLoginSuccess = () => {
    navigate(-1);
  }

  return (
    <>
      <Header />
      <Box sx={{ padding: "20px", background: "beige", minHeight: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            fontSize={"36px"}
            sx={{
              background: "darkblue",
              color: "white",
              marginBottom: "10px",
              border: "1px black solid",
              width: "400px",
              textAlign: "center",
            }}
          >
            {staffLogin ? "Staff Login" : "Customer Login"}{" "}
          </Typography>
          <LoginPanel allowedRoles={staffLogin ? [Roles.ROLE_ADMIN, Roles.ROLE_STAFF] : [Roles.ROLE_CUSTOMER]}
                      onStaffLoginSuccess={onStaffLoginSuccess}
                      onCustomerLoginSuccess={onCustomerLoginSuccess}
          />
          <Button
            sx={{ margin: "10px", width: "300px" }}
            variant="contained"
            onClick={() => setStaffLogin((prev) => !prev)}
          >
            {staffLogin
              ? "Switch to customer login"
              : "Switch to staff login"}{" "}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Login;
