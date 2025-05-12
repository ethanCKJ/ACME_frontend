import React from 'react'
import { CheckoutData, Action } from '../../contexts/CheckoutContext';
import { FormControl, FormLabel, TextField } from '@mui/material';
export interface FormInfo {
  title: string;
  fieldKey: keyof CheckoutData;
  fieldType: string;
  required: boolean;
  autocomplete: string;
}
interface FormProps extends FormInfo {
  dispatch: React.Dispatch<Action>;
  checkoutData: CheckoutData
}

export function FormattedField({ title, fieldKey, fieldType, required, autocomplete, checkoutData, dispatch }: FormProps) {
  return (
    <FormControl sx={{minWidth:"100%"}}>
      <FormLabel>{title}</FormLabel>
      <TextField
        type={fieldType}
        value={checkoutData[fieldKey]}
        autoComplete={autocomplete}
        required={required}
        onChange={(e) => dispatch({ type: "set", key: fieldKey, value: e.target.value })}
        sx={{ '& .MuiInputBase-input': { padding: 1 }}}
      />
    </FormControl>
  )
}
