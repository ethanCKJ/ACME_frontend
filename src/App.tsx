import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Home from "./pages/Home";
import { themeOptions } from "./theme";
import { CartProvider } from "./contexts/CartContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import Login from "./pages/Login.tsx";
import ProtectedRoutes from "./components/protection/ProtectedRoutes.tsx";
import ManageOrderPage from "./pages/ManageOrderPage.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import CustomerSignupPage from "./pages/CustomerSignupPage";
import StaffSignupPage from "./pages/StaffSignupPage";
import ProductPage from "./pages/ProductPage";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }

  // allow configuration using `createTheme()`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

function App() {
  const theme = useMemo(() => {
    return createTheme(themeOptions);
  }, []);

  console.log("App rendered");

  return (
    <AuthProvider>
      <CheckoutProvider>
        <CartProvider>
          <BrowserRouter>
            <CssBaseline />
            <ThemeProvider theme={theme}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/cookie"
                  element={<ProductPage category={"cookie"} />}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route
                  path="/manage_orders"
                  element={
                    <ProtectedRoutes allowsRoles={["ROLE_STAFF", "ROLE_ADMIN"]}>
                      <ManageOrderPage />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/staff_signup"
                  element={
                    <ProtectedRoutes allowsRoles={["ROLE_ADMIN"]}>
                      <StaffSignupPage />
                    </ProtectedRoutes>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/customer/signup"
                  element={<CustomerSignupPage />}
                />
              </Routes>
            </ThemeProvider>
          </BrowserRouter>
        </CartProvider>
      </CheckoutProvider>
    </AuthProvider>
  );
}

export default App;
