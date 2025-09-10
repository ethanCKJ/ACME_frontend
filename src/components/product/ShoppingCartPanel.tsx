import React from "react";
import { Box, Typography } from "@mui/material";
import QuantityInput from "../global/QuantityInput";
import { useCart } from "../../contexts/CartContext";
import { ProductCategory } from "../global/types";

interface CartItemProps {
  productName: string;
  imageName: string;
  quantity: number;
  setQuantity: (newQuantity: number) => void;
  category: ProductCategory;
}

const CartItem = ({
  productName,
  imageName,
  quantity,
  setQuantity,
  category,
}: CartItemProps) => {
  console.log(category);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        borderBottom: "1px solid black",
        alignItems: "center",
      }}
    >
      <Typography fontSize={"14px"}>{productName}</Typography>
      <img
        src={`/images/${category}/${imageName}.webp`}
        width={90}
        alt={productName}
      ></img>
      <QuantityInput quantity={quantity} setQuantity={setQuantity} />
    </Box>
  );
};

function ShoppingCartPanel() {
  const { cartContent, adjustQuantityById } = useCart();
  return (
    <Box
      sx={{ minWidth: "200px", bgcolor: "ivory", padding: "10px 2px 2px 0px" }}
    >
      <Typography textAlign={"center"} fontSize={"16px"} bgcolor={"orange"}>
        My cart
      </Typography>
      {cartContent.map((value) => (
        <CartItem
          key={value.productId}
          productName={value.productName}
          imageName={value.imageName}
          quantity={value.quantity}
          category={value.productCategory}
          setQuantity={(newQuantity: number) =>
            adjustQuantityById(value.productId, newQuantity)
          }
        />
      ))}
    </Box>
  );
}

export default ShoppingCartPanel;
