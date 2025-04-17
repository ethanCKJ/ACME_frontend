import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { cartObj } from '../pages/CookiePage'
import QuantityInput from './QuantityInput'

interface ShoppingCartPanelProps {
    cartContent: cartObj[];
    setCartContent: (arg0: any) => void;
}
interface CartItemProps {
    productName: string,
    imageName: string,
    quantity: number,

}
const CartItem = ({productName, imageName, quantity} : CartItemProps) =>{
    console.log("Product " + productName + "Q " + quantity)
    return (
    <Box sx={{display:"flex", width:"100%", flexDirection:"column", borderBottom: "1px solid black", alignItems:"center"}}>
        <Typography fontSize={"14px"}>{productName}</Typography>
        <img
        src={`/images/cookies/${imageName}.webp`}
        width={90}
        alt={imageName}
        >
        </img>
        <QuantityInput quantity={quantity} setQuantity={(q: number)=>{console.log(q)}}/>
    </Box>
    )
}
function ShoppingCartPanel({cartContent, setCartContent}: ShoppingCartPanelProps) {
  return (
    <Box sx={{minWidth:"200px", bgcolor:"ivory", padding:"10px 2px 2px 0px"}}>
        {cartContent.map((value, idx) => <CartItem  key={idx} productName={value.productName} imageName={value.imageName} quantity={value.quantity}/>)}
    </Box>
  )
}

export default ShoppingCartPanel