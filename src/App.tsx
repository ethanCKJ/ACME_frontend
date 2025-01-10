import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { CssBaseline } from '@mui/material'


function App() {


  return (
    <BrowserRouter>
      <CssBaseline/>
      <Routes>
        <Route path="/" element={<Home/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
