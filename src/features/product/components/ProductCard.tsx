import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { centsToDollar } from "../../../utils/cent2Dollar";
import { ProductCategory } from "../../../types/types";
import ProductModal from "./ProductModal";

export interface ProductCardProps {
  productId: number;
  imageName: string;
  productName: string;
  productInfo: string;
  price: number;
  stock: number;
  productCategory: ProductCategory;
}

/**
 * Card displaying product image, name and whether product is out of stock.
 * Clicking "Add to cart" opens a modal to select quantity to add to cart.
 * @param productId
 * @param imageName
 * @param productName
 * @param productInfo
 * @param price
 * @param stock
 * @param productCategory
 * @constructor
 */
function ProductCard({
  productId,
  imageName,
  productName,
  productInfo,
  price,
  stock,
  productCategory,
}: ProductCardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const outOfStock = stock === 0;

  return (
    <Box sx={{padding: 0}}>
      <ProductModal
        open={open}
        setOpen={setOpen}
        productCategory={productCategory}
        productId={productId}
        imageName={imageName}
        productName={productName}
        productInfo={productInfo}
        stock={stock}
        price={price}
      />
      <Card sx={{ "& .MuiCardContent-root": {height: "110px"}}}>
        <CardMedia
          component="img"
          alt={productName}
          height="214"
          image={`/images/${productCategory}/${imageName}.webp`}
        />
        <CardContent sx={{ padding: "0px 5px", m: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Typography variant="h6">{productName}</Typography>
          {outOfStock && (
            <Typography color={"red"} fontSize={14}>
              Out of stock
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              fontSize={16}
              flexGrow={1}
            >{`Price: $${centsToDollar(price)}`}</Typography>
            <Button variant="text" onClick={() => setOpen(true)} disabled={outOfStock}>
              Add to cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProductCard;
