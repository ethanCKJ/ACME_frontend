import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import QuantityInput from './QuantityInput'
import { useCart } from '../contexts/CartContext'


interface CartItemProps {
    productName: string,
    imageName: string,
    quantity: number,
    setQuantity: (newQuantity :number) => void,
}
const CartItem = ({productName, imageName, quantity, setQuantity} : CartItemProps) =>{
    return (
    <Box sx={{display:"flex", width:"100%", flexDirection:"column", borderBottom: "1px solid black", alignItems:"center"}}>
        <Typography fontSize={"14px"}>{productName}</Typography>
        <img
        src={`/images/cookies/${imageName}.webp`}
        width={90}
        alt={imageName}
        >
        </img>
        <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
    </Box>
    )
}
function ShoppingCartPanel() {
    const {cartContent, adjustQuantity} = useCart()
    return (
        <Box sx={{minWidth:"200px", bgcolor:"ivory", padding:"10px 2px 2px 0px"}}>
            <Typography textAlign={'center'} fontSize={"16px"} bgcolor={'orange'}>My cart</Typography>
            {cartContent.map((value, idx) => <CartItem key={idx} productName={value.productName} imageName={value.imageName} quantity={value.quantity} setQuantity={(newQuantity:number) => adjustQuantity(idx, newQuantity)}/>)}
        </Box>
    )
}

export default ShoppingCartPanel