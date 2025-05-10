import React from 'react'
import { Card, Button, Typography, FormControl, FormLabel, Box, TextField} from '@mui/material'
import { useCheckout } from '../contexts/CheckoutContext'
interface CheckoutFormProps{
  handleNext: () => void
}
interface FormItemProps {
  name: string,
  setter: React.Dispatch<React.SetStateAction<string>>,
  state: any,
  errorMsg: string,
  required: boolean,
  type: string,
  autocomplete: string,
}

const FormItem = ({name, setter, state, errorMsg, required, type, autocomplete} : FormItemProps) => (
  <FormControl>
    <FormLabel>{name}</FormLabel>
    <TextField
    type={type}
    onChange={(e) => setter(e.target.value)}
    value={state}
    sx={{'& .MuiInputBase-input':{padding:1}}}
    autoComplete={autocomplete}
    required={required}
    />
  </FormControl>
)

function CheckoutForm({handleNext} : CheckoutFormProps) {
  const {name, setName, email, setEmail, addressLine1, setAddressLine1, addressLine2, setAddressLine2, addressLine3, setAddressLine3, postcode} = useCheckout()
  const formInfo = [
    {
      name: "Name (required)",
      setter: setName,
      state: name,
      errorMsg: "Field is required",
      required: true,
      type: "text",
      autocomplete: "name"
    },
    {
      name: "Email",
      setter: setEmail,
      state: email,
      errorMsg: "Field is required",
      required: true,
      type: "email",
      autocomplete: "email"
    },
    {
      name: "Address line 1",
      setter: setAddressLine1,
      state: addressLine1,
      errorMsg: "Field is required",
      required: true,
      type: "text",
      autocomplete: "address-line1"
    },
    {
      name: "Address line 2",
      setter: setAddressLine2,
      state: addressLine2,
      errorMsg: "",
      required: false,
      type: "text",
      autocomplete: "address-line1"
    },
  ]
  const loggedIn = false;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  
  }


  return (
    <Card variant='outlined' sx={{width:"100%", padding:"10px 20px", display:"flex", flexDirection:"column", gap: 2}}>
      <Typography textAlign={"center"} fontSize="32px" fontWeight="bold">Enter delivery details</Typography>
      <Box component="form" sx={{display:"flex", flexDirection: "column", gap:2, "& .MuiFormLabel-root":{color:"black"}}} onSubmit={handleSubmit}>
        {formInfo.map((value, index) => <FormItem key={index} name={value.name} setter={value.setter} state={value.state} errorMsg={value.errorMsg} required={value.required} type={value.type} autocomplete={value.autocomplete}/>)}
      </Box>
      <Button type="submit">Next</Button>
    </Card>
  )
}

export default CheckoutForm