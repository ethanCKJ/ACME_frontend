import React, { SetStateAction, useEffect, useState } from "react";
import { cartObj, useCart } from "../../contexts/CartContext";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { centsToDollar } from "../../utils/cent2Dollar";
import QuantityInput from "../global/QuantityInput";
import { ProductCardProps } from "./ProductCard";

interface ProductModalProps extends ProductCardProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function ProductModal({
  open,
  setOpen,
  productId,
  productName,
  productInfo,
  price,
  imageName,
  productCategory,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: "450px", m: 0, p: 0 }}>
        <img
          src={`/images/${productCategory}/${imageName}.webp`}
          width="450px"
          height="300px"
          alt={productName}
        ></img>
        <Box sx={{ padding: "5px 0px 10px 10px" }}>
          <Typography fontSize={"18px"}>{productName}</Typography>
          <Typography>{productInfo}</Typography>
          <Typography>{`Price $${centsToDollar(price)} per unit`}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 5px",
            }}
          >
            <Typography>Quantity</Typography>
            <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            <Button
              variant="outlined"
              sx={{ marginLeft: "80px" }}
              onClick={() => {
                const newItem: cartObj = {
                  productId,
                  productName,
                  quantity,
                  price,
                  imageName,
                  productCategory,
                };
                addToCart(newItem);
                setOpen(false);
              }}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
