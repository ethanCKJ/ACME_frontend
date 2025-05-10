import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CookiePage from './pages/CookiePage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import Home from './pages/Home'
import { themeOptions } from './theme'
import { CartProvider } from './contexts/CartContext'
import { CheckoutProvider } from './contexts/CheckoutContext'


declare module '@mui/material/styles' {
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
    return createTheme(themeOptions)
  }, [])

  console.log("App rendered")
  

  return (
    <CheckoutProvider>
      <CartProvider>
      <BrowserRouter>
        <CssBaseline/>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/cookie" element={<CookiePage/>}/>
              <Route path="/cart" element={<CartPage/>}/>
              <Route path="/checkout" element={<CheckoutPage/>}/>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
        </CartProvider>
    </CheckoutProvider>
  )
}

export default App
