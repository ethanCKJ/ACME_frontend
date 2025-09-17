import React, {useState} from "react";
import {Box, Button, Card, FormControl, MenuItem, TextField, Typography,} from "@mui/material";
import {OrderStatus} from "../../../pages/CheckoutPage";
import {months, reg, years} from "../constants/constants";
import {useCreateOrder} from "../api/create-order";

interface CardFormProps {
  handleNext: () => void;
  setSuccessMsg: React.Dispatch<React.SetStateAction<OrderStatus>>;
}

/**
 * Form for user to enter their card details. If card details are valid, the order is submitted to the backend.
 * @param handleNext
 * @param setSuccessMsg
 * @constructor
 */
function CardForm({handleNext, setSuccessMsg}: CardFormProps) {
  const [cardNum, setCardNum] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // If backend accepts the order, this function will be called
  const onSuccess = (response: OrderStatus) => {
    setSuccessMsg(response);
    handleNext();
  }

  const {createOrder} = useCreateOrder({onSuccess});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrder();
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
          Payment details
        </Typography>
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: 2,
              "& .MuiFormLabel-root": {color: "black"},
              "& .MuiInputBase-input": {padding: 1, minWidth: "100%"},
            }}
        >
          <TextField
              variant="outlined"
              label="Card number"
              helperText="Just type any 8 digits"
              onChange={(e) => {
                const val = e.target.value;
                if (reg.test(val) && val.length <= 8) {
                  setCardNum(val);
                }
              }}
              value={cardNum}
              required
              autoFocus
          />
          <Box sx={{display: "flex", gap: 5}}>
            <FormControl>
              <TextField
                  select
                  label="Expiry month"
                  sx={{width: "150px"}}
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                  required
              >
                {months.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <FormControl>
              <TextField
                  select
                  label="Expiry year"
                  sx={{width: "150px"}}
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                  required
              >
                {years.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>

          <Box sx={{display: "flex", width: "100%", justifyContent: "center"}}>
            <Button variant="contained" sx={{width: "50%"}} type="submit">
              Make payment
            </Button>
          </Box>
        </Box>
      </Card>
  );
}

export default CardForm;
