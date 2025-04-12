import { useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CookiePage from './pages/CookiePage'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { themeOptions } from './theme'

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
  

  return (
    <BrowserRouter>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cookie" element={<CookiePage/>}/>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
  )
}

export default App
