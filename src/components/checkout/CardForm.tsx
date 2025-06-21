import React, {useState} from 'react'
import {Box, Button, Card, FormControl, MenuItem, TextField, Typography} from '@mui/material'
import {cartObj, useCart} from '../../contexts/CartContext';
import {useCheckout} from '../../contexts/CheckoutContext';
import api from '../../utils/api';
import {PREMIUM_DELIVERY_FEE, STANDARD_DELIVERY_FEE} from '../../utils/constants';
import {successMsg} from "../../pages/CheckoutPage.tsx";
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;

interface CardFormProps {
  handleNext: () => void
  setSuccessMsg: React.Dispatch<React.SetStateAction<successMsg>>,
}

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const currentYear = (new Date()).getFullYear();
const years = [
  currentYear + 1,
  currentYear + 2,
  currentYear + 3,
  currentYear + 4,
  currentYear + 5,
  currentYear + 6,
]

const reg = new RegExp("^\\d*$")

function CardForm({handleNext, setSuccessMsg}: CardFormProps) {
  const [cardNum, setCardNum] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const {cartContent, deliveryFee, setCartContent, setDeliveryFee, setCartCount} = useCart();
  const {checkoutData, setCheckoutData} = useCheckout();
  const resetData = () => {
    // Reset data on success
    setCartContent([]);
    setDeliveryFee(STANDARD_DELIVERY_FEE);
    setCheckoutData({});
    setCartCount(0);
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let deliveryFreeStr = "STANDARD";
    if (deliveryFee == PREMIUM_DELIVERY_FEE) {
      deliveryFreeStr = "PREMIUM"
    }
    const payload = {
      "orderDetails": [] as object[],
      "shipping": deliveryFreeStr,
      ...checkoutData
    }

    cartContent.forEach((cartObj: cartObj) => {
      const {productId, quantity} = cartObj;
      payload.orderDetails.push({productId, quantity});
    })
    console.log(payload)
    try {
      const res = await api.post("/order", payload);
      setSuccessMsg(res.data);
      alert("Successful Purchase!")

      resetData();
      handleNext()
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  return (
      <Card variant='outlined' sx={{
        width: "100%",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}>
        <Typography textAlign={"center"} fontSize="32px" fontWeight="bold">Payment
          details</Typography>
        <Box component="form"
             onSubmit={handleSubmit}
             sx={{
               display: "flex",
               flexDirection: "column",
               alignItems: "stretch",
               gap: 2,
               "& .MuiFormLabel-root": {color: "black"},
               "& .MuiInputBase-input": {padding: 1, minWidth: "100%"}
             }}>
          <TextField
              variant='outlined'
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
              autoFocus/>
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
                {months.map(value => <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>)
                }

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
                {years.map(value => <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>)}
              </TextField>
            </FormControl>
          </Box>


          <Box sx={{display: "flex", width: "100%", justifyContent: "center"}}>
            <Button variant='contained' sx={{width: "50%"}} type="submit">Make payment</Button>
          </Box>
        </Box>
      </Card>
  )
}

export default CardForm