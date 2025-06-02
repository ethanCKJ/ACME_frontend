import Header from "../components/home/Header.tsx";
import LoginPanel from "../components/global/LoginPanel.tsx";
import {Box, Button, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [staffLogin, setStaffLogin] = useState(false);

  const onSuccess = () => {
    console.log("Hello")
    try{
      navigate(location.state.from)
    }
    catch {
      if (staffLogin){
        navigate("/manage_orders")
      }
      else{
        navigate("/")
      }
    }

  }
  return (
      <>
        <Header/>
        <Box sx={{ padding:"20px",background:"beige", minHeight:"100%"}}>
          <Box sx={{display:"flex", alignItems: "center", flexDirection:"column"}}>
            <Typography fontSize={"36px"} sx={{background:"darkblue", color:"white", marginBottom:"10px", border:"1px black solid", width:"400px", textAlign:"center"}}>{staffLogin ? "Staff Login": "Customer Login"} </Typography>
            <LoginPanel onSuccess={onSuccess}/>
            <Button sx={{margin:"10px", width:"300px"}} variant="contained" onClick={() => setStaffLogin((prev) => !prev)}>{staffLogin ? "Switch to customer login": "Switch to staff login"} </Button>
          </Box>
        </Box>
      </>
  )
}

export default Login
