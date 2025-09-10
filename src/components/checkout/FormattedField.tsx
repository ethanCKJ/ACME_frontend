import React, { ChangeEvent, useState } from "react";
import { CheckoutData, Action } from "../../contexts/CheckoutContext";
import { FormControl, FormLabel, TextField } from "@mui/material";
export interface FormInfo {
  title: string;
  fieldKey: keyof CheckoutData;
  fieldType: string;
  required: boolean;
  autocomplete: string;
  maxlen?: number;
}
interface FormProps extends FormInfo {
  dispatch: React.Dispatch<Action>;
  checkoutData: CheckoutData;
}

const isValidEmail = (email: string) => {
  if (
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ) === null
  ) {
    return false;
  }
  return true;
};
export function FormattedField({
  title,
  fieldKey,
  fieldType,
  required,
  autocomplete,
  checkoutData,
  dispatch,
  maxlen,
}: FormProps) {
  const [errorMsg, setErrorMsg] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (maxlen === undefined || e.target.value.length <= maxlen) {
      // disable error message when user inputs a valid email
      if (
        fieldType === "email" &&
        errorMsg !== "" &&
        isValidEmail(e.target.value)
      ) {
        setErrorMsg("");
      }
      dispatch({ type: "set", key: fieldKey, value: e.target.value });
    }
  };
  return (
    <FormControl sx={{ minWidth: "100%" }}>
      <FormLabel>{title}</FormLabel>
      <TextField
        type="text"
        value={checkoutData[fieldKey]}
        autoComplete={autocomplete}
        required={required}
        onChange={handleChange}
        sx={{ "& .MuiInputBase-input": { padding: 1 } }}
        error={errorMsg.length > 0}
        helperText={errorMsg}
        onBlur={(e) => {
          if (fieldType === "email" && !isValidEmail(e.target.value)) {
            setErrorMsg("Please enter a valid email");
          }
        }}
      />
    </FormControl>
  );
}
