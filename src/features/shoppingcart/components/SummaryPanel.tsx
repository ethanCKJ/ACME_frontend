import {useCart} from "../../../contexts/CartContext";
import React, {useMemo} from "react";
import {
  Box, Button,
  FormControl,
  FormControlLabel,
  Grid2,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import {centsToDollar} from "../../../utils/cent2Dollar";
import {PREMIUM_DELIVERY_FEE, STANDARD_DELIVERY_FEE} from "../../../utils/constants";

/**
 * Side panel summarising total bill and allows selecting delivery method.
 * @constructor
 */
export const SummaryPanel = () => {
  const {cartContent, setDeliveryFee, deliveryFee} = useCart();

  const total = useMemo(() => {
    let sum = 0;
    cartContent.forEach(
        (value) => (sum = sum + value.price * value.quantity),
    );
    return sum;
  }, [cartContent]);

  return (
      <Box
          sx={{
            width: "250px",
            background: "white",
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2px",
          }}
      >
        <Typography fontSize={"30px"} fontWeight={"bold"}>
          Summary
        </Typography>
        <Box sx={{borderTop: "2px solid black", width: "100%"}}>
          <Grid2 container spacing={2} sx={{padding: "2px"}}>
            <Grid2 size={8}>Product Total:</Grid2>
            <Grid2 size={4}>{centsToDollar(total)}</Grid2>
            <Grid2 size={8}>
              Delivery:
              <FormControl>
                <RadioGroup
                    onChange={(e) => {
                      if (parseInt(e.target.value) === STANDARD_DELIVERY_FEE) {
                        setDeliveryFee(STANDARD_DELIVERY_FEE);
                      } else {
                        setDeliveryFee(PREMIUM_DELIVERY_FEE);
                      }
                    }}
                    value={deliveryFee}
                >
                  {/* Problem here is selection (value of RadioGroup) is not tied to deliveryFee state to need to double click */}
                  <FormControlLabel
                      value={STANDARD_DELIVERY_FEE}
                      control={<Radio/>}
                      label={`standard $${centsToDollar(STANDARD_DELIVERY_FEE)}`}
                      labelPlacement="end"
                  />
                  <FormControlLabel
                      value={PREMIUM_DELIVERY_FEE}
                      control={<Radio/>}
                      label={`premium $${centsToDollar(PREMIUM_DELIVERY_FEE)}`}
                      labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid2>
            <Grid2 size={4}>{centsToDollar(deliveryFee)}</Grid2>
            <Grid2 size={8}>Total:</Grid2>
            <Grid2 size={4}>{centsToDollar(total + deliveryFee)}</Grid2>
            <Grid2
                size={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
            >
              <Button variant="contained" href="/checkout">
                Proceed to checkout
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
  );
};