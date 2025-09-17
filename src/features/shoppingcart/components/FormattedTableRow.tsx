import {Box, TableCell, TableRow, Typography} from "@mui/material";
import {centsToDollar} from "../../../utils/cent2Dollar";
import QuantityInput from "../../../components/QuantityInput";
import React from "react";
import {useCart} from "../../../contexts/CartContext";

interface FormattedTableRowProps {
  productName: string;
  productId: number;
  imageName: string;
  price: number;
  category: string;
}

/**
 * One row in the table for inspecting and modifying a cart item.
 * @param productName - name of the product
 * @param productId - unique product identifier
 * @param imageName - image file name
 * @param price - price in cents
 * @param category - product category
 */
export const FormattedTableRow = ({
                              productName,
                              productId,
                              imageName,
                              price,
                              category
                            }: FormattedTableRowProps) => {
  const {adjustQuantityById, cartContent} = useCart();
  const quantity = cartContent.find((item) => item.productId === productId)?.quantity || 0;
  return (
      <TableRow
          sx={{
            height: "2px",
            padding: 0,
            borderBottom: "2px solid grey",
            borderTop: "2px solid red",
          }}
      >
        <TableCell sx={{padding: "10px 5px", display: "flex"}}>
          <img src={`images/${category}/${imageName}.webp`} width="150px"></img>
          <Box
              sx={{
                display: "flex",
                marginLeft: "10px",
                flexDirection: "column",
              }}
          >
            <Typography fontWeight={"bold"} fontSize={"16px"}>
              {productName}
            </Typography>
            <Typography>{`$${centsToDollar(price)}`}</Typography>
          </Box>
        </TableCell>
        <TableCell sx={{padding: "5px"}}>
          <Box sx={{display: "flex", justifyContent: "center"}}>
            <QuantityInput
                quantity={quantity}
                setQuantity={(newQuantity: number) =>
                    adjustQuantityById(productId, newQuantity)
                }
            />
          </Box>
        </TableCell>
        <TableCell
            sx={{padding: "5px", fontSize: "16px", textAlign: "center"}}
        >
          {centsToDollar(price * quantity)}
        </TableCell>
      </TableRow>
  );
};