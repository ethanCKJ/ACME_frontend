import React from "react";
import Header from "../../features/home/Header";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import {useCheckout} from "../../contexts/CheckoutContext";
import {createCustomer} from "../../features/account/api/create-customer";

export interface IFormInput {
  customerName: string;
  username: string;
  password: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  postcode: string;
  confirmPassword: string;
}

export default function CustomerSignupPage() {
  const { control, handleSubmit, formState: {isSubmitting} } = useForm({
    defaultValues: {
      customerName: "",
      username: "",
      password: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      postcode: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const prevPathName = location.state?.prevPathname;
  let redirectOnSuccessRoute = "/";
  if (prevPathName && prevPathName !== "/login") {
    redirectOnSuccessRoute = prevPathName;
  }
  const { setCheckoutData } = useCheckout();

  const { login } = useAuth();
  const onSubmit = (data: IFormInput) => {
    createCustomer({data, navigate, redirectOnSuccessRoute, setCheckoutData, login});
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          background: "beige",
          minHeight: "100vh",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
            width: "800px",
            maxHeight: "min-content",
          }}
        >
          <Typography fontSize={"36px"}>Customer signup</Typography>
          <Typography>Customers enjoy a faster checkout experience</Typography>
          <Box
            component="form"
            sx={{
              "& .MuiInputBase-input": {
                padding: 1,
                color: "black",
                minWidth: "100%",
              },
              "& .MuiFormControl-root": { minWidth: "100%" },
              "& .MuiFormLabel-root": { color: "black" },
              width: "600px",
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
              paddingBottom: "20px",
              paddingTop: "10px",
              alignItems: "center",
            }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="customerName"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field, fieldState }) => (
                <FormControl>
                  <FormLabel>Name (required)</FormLabel>
                  <TextField
                    {...field}
                    autoComplete="name"
                    helperText={fieldState.error?.message}
                    error={!!fieldState.error}
                  />
                </FormControl>
              )}
            />
            <Controller
              name="username"
              control={control}
              rules={{
                required: "This field is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              }}
              render={({ field, fieldState }) => (
                <FormControl>
                  <FormLabel>Email (required)</FormLabel>
                  <TextField
                    {...field}
                    autoComplete="email"
                    helperText={fieldState.error?.message}
                    error={!!fieldState.error}
                  />
                </FormControl>
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field, fieldState }) => (
                <FormControl>
                  <FormLabel>Password (required)</FormLabel>
                  <TextField
                    {...field}
                    type="password"
                    helperText={fieldState.error?.message}
                    error={!!fieldState.error}
                  />
                </FormControl>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                validate: (
                  val: string,
                  formValues: {
                    password: string;
                  },
                ) => formValues.password === val || "Password does not match",
              }}
              render={({ field, fieldState }) => (
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <TextField
                    {...field}
                    type="password"
                    helperText={fieldState.error?.message}
                    error={!!fieldState.error}
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
              render={({ field, fieldState }) => (
                <FormControl>
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
              render={({ field, fieldState }) => (
                <FormControl>
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
              render={({ field, fieldState }) => (
                <FormControl>
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
              render={({ field, fieldState }) => (
                <FormControl>
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
              rules={{ required: "This field is required" }}
              render={({ field, fieldState }) => (
                <FormControl>
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
              rules={{ required: "This field is required" }}
              render={({ field, fieldState }) => (
                <FormControl>
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
              variant="contained"
              type="submit"
              sx={{ width: "200px" }}
              disabled={isSubmitting}
            >
              Sign up
            </Button>
            {isSubmitting && <CircularProgress/>}
          </Box>
        </Box>
      </Box>
    </>
  );
}
