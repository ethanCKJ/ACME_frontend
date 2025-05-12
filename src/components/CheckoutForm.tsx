import React from 'react'
import { useState } from 'react'
import { Card, Button, Typography, FormControl, FormLabel, Box, TextField} from '@mui/material'
import { useCheckout } from '../contexts/CheckoutContext'
import { CheckoutData } from '../contexts/CheckoutContext'
interface CheckoutFormProps{
  handleNext: () => void
}
// interface FormItemProps {
//   name: string,
//   setter: React.Dispatch<React.SetStateAction<string>>,
//   state: any,
//   errorMsg: string,
//   required: boolean,
//   type: string,
//   autocomplete: string,
// }

// const FormItem = ({name, setter, state, errorMsg, required, type, autocomplete} : FormItemProps) => (
//   <FormControl>
//     <FormLabel>{name}</FormLabel>
//     <TextField
//     type={type}
//     onChange={(e) => setter(e.target.value)}
//     value={state}
//     sx={{'& .MuiInputBase-input':{padding:1}}}
//     autoComplete={autocomplete}
//     required={required}
//     />
//   </FormControl>
// )


function CheckoutForm({handleNext} : CheckoutFormProps) {
  const {name, setName, email, setEmail, addressLine1, setAddressLine1, addressLine2, setAddressLine2, addressLine3, setAddressLine3, postcode, setPostcode} = useCheckout()
  const [mainErrorMsg, setMainErrorMsg] = useState(false);
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
    console.log("SUBMIT")
    event.preventDefault();
    console.log(errors)
    Object.values(errors).forEach(value => {
      if (value !== ""){
        return;
      }
    })
    console.log("All ok")
    handleNext();
  }

  const [errors, setErrors] = useState<{[K in keyof CheckoutData]?: string}>({})
  function handleChange<K extends keyof CheckoutData>(field: K, value: string, setter: (arg:any)=> void, required:boolean){
    setter(value);
    if (required && value === ""){
      setErrors({...errors, [field]:"Required"})
    }
    else if (field=="email" && !/\S+@\S+\.\S+/.test(email)){
      setErrors({...errors, [field]:"Please enter a valid email"})
    }
    else{
      setErrors({...errors, [field]:""})
    }
  }

  return (
    <Card variant='outlined' sx={{width:"100%", padding:"10px 20px", display:"flex", flexDirection:"column", gap: 2}}>
      <Typography textAlign={"center"} fontSize="32px" fontWeight="bold">Enter delivery details</Typography>
      <Box component="form" sx={{display:"flex", flexDirection: "column", gap:2, "& .MuiFormLabel-root":{color:"black"}}} onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Name (required)</FormLabel>
          <TextField
          type="text"
          value={name}
          autoComplete='name'
          required
          onChange={(e) => handleChange("name", e.target.value, setName, true)}
          error={errors["name"] != undefined && errors["name"].length > 0}
          helperText={errors["name"]}
          sx={{'& .MuiInputBase-input':{padding:1}}}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email (required)</FormLabel>
          <TextField
          type="email"
          value={email}
          autoComplete='email'
          required
          onChange={(e) => handleChange("email", e.target.value, setEmail, true)}
          error={errors["email"] != undefined && errors["email"].length > 0}
          helperText={errors["email"]}
          sx={{'& .MuiInputBase-input':{padding:1}}}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Address Line 1 (required)</FormLabel>
          <TextField
          type="text"
          value={addressLine1}
          autoComplete='address-line1'
          required
          onChange={(e) => handleChange("addressLine1", e.target.value, setAddressLine1, true)}
          error={errors["addressLine1"] != undefined && errors["addressLine1"].length > 0}
          helperText={errors["addressLine1"]}
          sx={{'& .MuiInputBase-input':{padding:1}}}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Address Line 2</FormLabel>
          <TextField
          type="text"
          value={addressLine2}
          autoComplete='address-line2'
          onChange={(e) => handleChange("addressLine2", e.target.value, setAddressLine2, false)}
          error={errors["addressLine2"] != undefined && errors["addressLine2"].length > 0}
          helperText={errors["addressLine2"]}
          sx={{'& .MuiInputBase-input':{padding:1}}}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Address Line 3</FormLabel>
          <TextField
          type="text"
          value={addressLine3}
          autoComplete='address-line3'
          onChange={(e) => handleChange("addressLine3", e.target.value, setAddressLine3, false)}
          error={errors["addressLine3"] != undefined && errors["addressLine3"].length > 0}
          helperText={errors["addressLine3"]}
          sx={{'& .MuiInputBase-input':{padding:1}}}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Postcode (required)</FormLabel>
          <TextField
          type="text"
          value={postcode}
          autoComplete='postal-code'
          required
          onChange={(e) => handleChange("postcode", e.target.value, setPostcode, true)}
          error={errors["postcode"] != undefined && errors["postcode"].length > 0}
          helperText={errors["postcode"]}
          sx={{'& .MuiInputBase-input':{padding:1}}}
          />
        </FormControl>
      <Button type="submit">Next</Button>
      </Box>
    </Card>
  )
}

export default CheckoutForm