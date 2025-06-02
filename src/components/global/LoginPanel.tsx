import React, { useState } from 'react'
import { Box, Card, FormControl, FormLabel, Typography, TextField, Button, Link } from '@mui/material'
import api from '../api.ts';
import {TOKEN_KEY} from "../constants.ts";
interface LoginPanelProps {
  onSuccess?: () => void;
}
function LoginPanel({onSuccess} : LoginPanelProps) {
  const [passwordError, setPasswordError] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const username = formdata.get("email")?.valueOf()
    const password = formdata.get("password")?.valueOf()
    console.log("Email ",username, "Password ", password)
    try{
      const res = await api.post("/token", { username, password })
      if (res.status === 200) {
        localStorage.setItem(TOKEN_KEY, res.data)
        console.log("Successful login")
        if (onSuccess) {
          onSuccess();
        }
      }
      else {
        setPasswordError(true);
      }
    }
    catch (err){
      console.log(err);
      setPasswordError(true);
    }
  }


  return (
    <Card variant='outlined' sx={{ width: "400px", padding: "10px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography fontSize="32px" fontWeight="bold">Sign In</Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, "& .MuiFormLabel-root": { color: "black" } }} onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <TextField
            id="email"
            type="email"
            name="email"
            placeholder='example@gmail.com'
            autoComplete='email'
            required
            autoFocus
            variant='outlined'
            sx={{ '& .MuiInputBase-input': { padding: 1 } }} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <TextField
            id="password"
            type="password"
            name="password"
            autoComplete='password'
            autoFocus
            required
            variant='outlined'
            error={passwordError}
            helperText={passwordError ? "No matching email and password found" : ""}
            sx={{ '& .MuiInputBase-input': { padding: 1 } }} />
        </FormControl>
        <Button variant='contained' type="submit">Sign in</Button>
        <Typography>Don&apos;t have an account?{' '}
          <Link href="/public" color='info'>Sign up</Link>
        </Typography>
      </Box>
    </Card>
  )
}

export default LoginPanel