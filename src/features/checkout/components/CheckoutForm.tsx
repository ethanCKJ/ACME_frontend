import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CheckoutData, useCheckout } from "../../../contexts/CheckoutContext";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useAuth } from "../../../contexts/AuthContext";
import { Roles } from "../../../types/types";

interface CheckoutFormProps {
  handleNext: () => void
}

/**
 * Form collecting user data e.g. name, address, email, phone number etc for checkout.
 * If user is logged in, the form is autofilled with the user's data and editing is disabled.
 * @param handleNext
 * @constructor
 */
function CheckoutForm({ handleNext }: CheckoutFormProps) {
  const { role } = useAuth();
  const [disableForm, setDisableForm] = useState(false);
  useEffect(() => {
    if (role === Roles.ROLE_CUSTOMER) {
      setDisableForm(true);
    }
  }, [role]);
  const { checkoutData, setCheckoutData } = useCheckout();
  const { control, handleSubmit } = useForm<CheckoutData>({
    defaultValues: checkoutData,
  });

  const formValues = useWatch({ control });
  useEffect(() => {
    // Preserve form data in context so that it is not lost when navigating back or refreshing the page.
    setCheckoutData(formValues);
  }, [formValues]);

  const onSubmit = () => {
    handleNext();
  };
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography textAlign={"center"} fontSize="32px" fontWeight="bold">
        Enter delivery details
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          "& .MuiFormLabel-root": { color: "black" },
          "& .MuiInputBase-input": { padding: 1 },
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="customerName"
          rules={{ required: "This field is required" }}
          control={control}
          disabled={disableForm}
          render={({ field, fieldState }) => (
            <FormControl sx={{ minWidth: "100%" }}>
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
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter a valid email",
            },
          }}
          control={control}
          disabled={disableForm}
          render={({ field, fieldState }) => (
            <FormControl sx={{ minWidth: "100%" }}>
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
            maxLength: { value: 20, message: "Maximum of 20 characters" },
          }}
          control={control}
          disabled={disableForm}
          render={({ field, fieldState }) => (
            <FormControl sx={{ minWidth: "100%" }}>
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
          rules={{ required: "This field is required" }}
          control={control}
          disabled={disableForm}
          render={({ field, fieldState }) => (
            <FormControl sx={{ minWidth: "100%" }}>
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
          disabled={disableForm}
          render={({ field, fieldState }) => (
            <FormControl sx={{ minWidth: "100%" }}>
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
          disabled={disableForm}
          render={({ field, fieldState }) => (
            <FormControl sx={{ minWidth: "100%" }}>
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
          disabled={disableForm}
          rules={{ required: "This field is required" }}
          render={({ field, fieldState }) => (
            <FormControl sx={{ minWidth: "100%" }}>
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
          disabled={disableForm}
          rules={{ required: "This field is required", maxLength: { value: 10, message: "Maximum of 10 characters" } }}
          render={({ field, fieldState }) => (
            <FormControl sx={{ minWidth: "100%" }}>
              <FormLabel>Postcode (required)</FormLabel>
              <TextField
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            </FormControl>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ width: "50%", marginTop: "20px" }}
        >
          Next
        </Button>
      </Box>
    </Card>
  );
}

export default CheckoutForm;
