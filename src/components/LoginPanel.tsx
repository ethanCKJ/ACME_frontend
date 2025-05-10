import React, { useState } from 'react'
import { Box, Card, FormControl, FormLabel, Typography, TextField, Button, Link} from '@mui/material'
import api from './api';

function LoginPanel() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    let email = formdata.get("email")?.valueOf()
    let password = formdata.get("password")?.valueOf()
    if (!email || !/\S+@\S+\.\S+/.test(email)){
      setEmailError(true)
      return;
    }
    const res = await api.post("/login",{email, password})
    if (res.status === 200){
      console.log("Successful login")
    }
    else{
      setPasswordError(true);
    }
  }


  return (
    <Card variant='outlined' sx={{width:"400px", padding:"10px 20px", display:"flex", flexDirection:"column", gap: 2}}>
      <Typography fontSize="32px" fontWeight="bold">Sign In</Typography>
      <Box component="form" sx={{display:"flex", flexDirection:"column", gap: 2, "& .MuiFormLabel-root":{color:"black"}}} onSubmit={handleSubmit}>
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
          error={emailError}
          helperText={emailError ? "Please enter a valid email" : ""}
          sx={{'& .MuiInputBase-input':{padding:1}}}/>
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
          sx={{'& .MuiInputBase-input':{padding:1}}}/>
        </FormControl>
        <Button variant='contained' type="submit">Sign in</Button>
        <Typography>Don&apos;t have an account?{' '}
          <Link href="/" color='info'>Sign up</Link>
        </Typography>
      </Box>
    </Card>
  )
}

export default LoginPanel