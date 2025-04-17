import React from 'react'
import { Box, Typography, IconButton, useTheme } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

interface QuantityInputProps {
    setQuantity: (quantity: number) => void;
    quantity: number,
}
function QuantityInput({setQuantity, quantity}: QuantityInputProps) {
    const handleQuantityIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setQuantity(quantity+1)
    }
    const handleQuantityDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setQuantity(Math.max(1,quantity-1))
    }
    const theme = useTheme();
    return (
        <Box sx={{display:"flex", marginRight:"80px", alignItems:"center"}}>
            <IconButton onClick={handleQuantityDecrement} color='primary'>
                <IndeterminateCheckBoxOutlinedIcon/>
            </IconButton>
            <Box sx={{width:"50px",height:"25px", margin:"3px 0px", padding:0, border: `2px solid ${theme.palette.primary.main}`, display:"flex", justifyContent:"center", alignItems:"center"}}><Typography>{quantity}</Typography></Box>
            <IconButton onClick={handleQuantityIncrement} color='primary' >
                <AddBoxOutlinedIcon/>
            </IconButton>
        </Box>
    )
}

export default QuantityInput