import {Box, Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import React, {useState} from 'react';
import {centsToDollar} from '../../utils/cent2Dollar';
import {ProductCategory} from "../global/types";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  productId: number,
  imageName: string,
  productName: string,
  productInfo: string,
  price: number,
  productCategory: ProductCategory,
}

function ProductCard({
                       productId,
                       imageName,
                       productName,
                       productInfo,
                       price,
                       productCategory
                     }: ProductCardProps) {

  const [open, setOpen] = useState<boolean>(false);

  return (
      <Box sx={{minWidth: "320px", padding: 0}}>
        <ProductModal open={open} setOpen={setOpen} productCategory={productCategory} productId={productId}
                      imageName={imageName} productName={productName} productInfo={productInfo}
                      price={price}/>
        <Card sx={{paddingBottom: 0}}>
          <CardMedia
              component="img"
              alt={productName}
              height="214"
              image={`/images/${productCategory}/${imageName}.webp`}
          />
          <CardContent sx={{padding: "0px 5px", m: 0}}>
            <Typography variant="h6">{productName}</Typography>
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <Typography fontSize={16}
                          flexGrow={1}>{`Price: \$${centsToDollar(price)}`}</Typography>
              <Button variant="text" onClick={() => setOpen(true)}>Add to cart</Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
  )
}

export default ProductCard