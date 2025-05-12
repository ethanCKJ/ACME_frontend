import React from 'react'
import { useState } from 'react'
import { Card, Button, Typography, FormControl, FormLabel, Box, TextField } from '@mui/material'
import { useCheckout, CheckoutData } from '../contexts/CheckoutContext'
import { FormInfo, FormattedField } from './FormattedField'

interface CheckoutFormProps {
  handleNext: () => void
}

const formInfo: FormInfo[] = [
  {
    title: "Name (required)",
    fieldKey: "name",
    fieldType: "text",
    required: true,
    autocomplete: "name"
  },
  {
    title: "Email (required)",
    fieldKey: "email",
    fieldType: "email",
    required: true,
    autocomplete: "email"
  },
  {
    title: "Address Line 1 (required)",
    fieldKey: "addressLine1",
    fieldType: "text",
    required: true,
    autocomplete: "address-line1"
  },
  {
    title: "Address Line 2",
    fieldKey: "addressLine2",
    fieldType: "text",
    required: false,
    autocomplete: "address-line2"
  },
  {
    title: "Address line 3",
    fieldKey: "addressLine3",
    fieldType: "text",
    required: false,
    autocomplete: "address-line3"
  },
  {
    title: "Postcode (required)",
    fieldKey: "postcode",
    fieldType: "text",
    required: true,
    autocomplete: "postcode"
  },
]

function CheckoutForm({ handleNext }: CheckoutFormProps) {
  const { checkoutData, dispatchCheckout } = useCheckout()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("SUBMIT")
    event.preventDefault();
    handleNext();
  }

  return (
    <Card variant='outlined' sx={{ width: "100%", padding: "10px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography textAlign={"center"} fontSize="32px" fontWeight="bold">Enter delivery details</Typography>
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, "& .MuiFormLabel-root": { color: "black" } }} onSubmit={handleSubmit}>
        {formInfo.map((value) => <FormattedField key={value.title}
          title={value.title}
          fieldKey={value.fieldKey}
          fieldType={value.fieldType}
          required={value.required}
          autocomplete={value.autocomplete}
          checkoutData={checkoutData}
          dispatch={dispatchCheckout}
        />)}
        <Button type="submit">Next</Button>
      </Box>
    </Card>
  )
}

export default CheckoutForm