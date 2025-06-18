import {Box, Button, Card, FormControl, FormLabel, TextField, Typography} from '@mui/material'
import React, {useEffect} from 'react'
import {CheckoutData, useCheckout} from '../../contexts/CheckoutContext'
import {FormInfo} from './FormattedField'
import {Controller, useForm, useWatch} from "react-hook-form";

interface CheckoutFormProps {
  handleNext: () => void
}

const formInfo: FormInfo[] = [
  {
    title: "Name (required)",
    fieldKey: "customerName",
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
    title: "Phone (required)",
    fieldKey: "phone",
    fieldType: "text",
    required: true,
    autocomplete: "",
    maxlen: 20,
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
    title: "City (required)",
    fieldKey: "city",
    fieldType: "text",
    required: true,
    autocomplete: "city"
  },
  {
    title: "Postcode (required)",
    fieldKey: "postcode",
    fieldType: "text",
    required: true,
    autocomplete: "postcode"
  },
]

function CheckoutForm({handleNext}: CheckoutFormProps) {
  const {checkoutData, setCheckoutData} = useCheckout();
  const {
    control,
    handleSubmit
  } = useForm<CheckoutData>({defaultValues: checkoutData})

  const formValues = useWatch({control});
  useEffect(() => {
    setCheckoutData(formValues);
  }, [formValues]);

  const onSubmit = () => {
    handleNext();
  }
  return (
      <Card variant='outlined' sx={{
        width: "100%",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}>
        <Typography textAlign={"center"} fontSize="32px" fontWeight="bold">Enter delivery
          details</Typography>
        <Box component="form" sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          "& .MuiFormLabel-root": {color: "black"},
          "& .MuiInputBase-input": {padding: 1},
        }} onSubmit={handleSubmit(onSubmit)}>
          <Controller
              name="customerName"
              rules={{required: "This field is required"}}
              control={control}
              render={({field, fieldState}) => (
                  <FormControl sx={{minWidth: "100%"}}>
                    <FormLabel>Name (required)</FormLabel>
                    <TextField
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                  </FormControl>
              )}
          />
          <Controller
              name="email"
              rules={{
                required: "This field is required",
                pattern:
                    {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email"
                    }
              }}
              control={control}
              render={({field, fieldState}) => (
                  <FormControl sx={{minWidth: "100%"}}>
                    <FormLabel>Email (required)</FormLabel>
                    <TextField
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                  </FormControl>
              )}
          />
          <Controller
              name="phone"
              rules={{
                required: "This field is required",
                maxLength: {value: 20, message: "Maximum of 20 characters"},
              }}
              control={control}
              render={({field, fieldState}) => (
                  <FormControl sx={{minWidth: "100%"}}>
                    <FormLabel>Phone (required)</FormLabel>
                    <TextField
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                  </FormControl>
              )}
          />
          <Controller
              name="addressLine1"
              rules={{required: "This field is required"}}
              control={control}
              render={({field, fieldState}) => (
                  <FormControl sx={{minWidth: "100%"}}>
                    <FormLabel>Address line 1 (required)</FormLabel>
                    <TextField
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                  </FormControl>
              )}
          />
          <Controller
              name="addressLine2"
              control={control}
              render={({field, fieldState}) => (
                  <FormControl sx={{minWidth: "100%"}}>
                    <FormLabel>Address line 2</FormLabel>
                    <TextField
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                  </FormControl>
              )}
          />
          <Controller
              name="addressLine3"
              control={control}
              render={({field, fieldState}) => (
                  <FormControl sx={{minWidth: "100%"}}>
                    <FormLabel>Address line 3</FormLabel>
                    <TextField
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                  </FormControl>
              )}
          />
          <Controller
              name="city"
              control={control}
              rules={{required: "This field is required"}}
              render={({field, fieldState}) => (
                  <FormControl sx={{minWidth: "100%"}}>
                    <FormLabel>City (required)</FormLabel>
                    <TextField
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                  </FormControl>
              )}
          />
          <Controller
              name="postcode"
              control={control}
              rules={{required: "This field is required"}}
              render={({field, fieldState}) => (
                  <FormControl sx={{minWidth: "100%"}}>
                    <FormLabel>Postcode (required)</FormLabel>
                    <TextField
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                  </FormControl>
              )}
          />


          <Button type="submit" variant='contained'
                  sx={{width: "50%", marginTop: "20px"}}>Next</Button>
        </Box>
      </Card>
  )
}

export default CheckoutForm