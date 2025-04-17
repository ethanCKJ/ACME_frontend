import React, { useState } from 'react'
import { Box, Card, CardContent, CardMedia, Typography, Button, Dialog, IconButton, TextField, useTheme } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import QuantityInput from './QuantityInput';
interface ProductCardProps {
    productId: number,
    imageName: string,
    addToCart: (productId:number, productName: string, quantity: number, price:number, imageName: string) => void,
    productName: string,
    productInfo: string,
    price: number,
}

function ProductCard({productId, imageName, addToCart, productName, productInfo, price}: ProductCardProps) {
    
    const [open, setOpen] = useState<boolean>(false);
    // Why make a separate function with arguments when you can just use the local variables?
    const ProductModal = () => {
        const handleQuantityIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
            setQuantity(quantity+1)
        }
        const handleQuantityDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
            setQuantity(Math.max(1,quantity-1))
        }
        const [quantity, setQuantity] = useState<number>(1);
        const theme = useTheme();

        return(
            <Dialog
            open={open}
            onClose={() => setOpen(false)}
            >
                <Box sx={{width:"450px", m:0, p:0}}>
                    <img
                    src={`/images/cookies/${imageName}.webp`}
                    width="450px"
                    height="300px"
                    alt={productName}
                    >
                    </img>
                    <Box sx={{padding: "5px 0px 10px 10px"}}>
                        <Typography variant="body1" fontSize={"18px"}>{productName}</Typography>
                        {/* Default Typography is already body1 */}
                        <Typography>{productInfo}</Typography>
                        <Typography>{`Price \$${price} per unit`}</Typography>
                        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding: "0px 5px"}}>
                            <Typography>Quantity</Typography>
                            <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
                            <Button variant="outlined" onClick={()=>{addToCart(productId, productName,quantity,price, imageName), setOpen(false)}}>
                                Add to cart
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        )
    }
  return (
    <Box sx={{minWidth: "320px", padding:0}}>
        <ProductModal/>
        <Card sx={{paddingBottom: 0}}>
            <CardMedia
            component="img"
            alt={productName}
            height="214"
            image={`/images/cookies/${imageName}.webp`}
            />
            <CardContent sx={{padding: "0px 5px", m:0}}>
                <Typography variant="h6">{productName}</Typography>
                <Box sx={{display:"flex", justifyContent: "space-between", alignItems:"center"}}>
                    <Typography variant="body" fontSize={16} flexGrow={1}>{`Price: \$${price}`}</Typography>
                    <Button variant="text" onClick={() => setOpen(true)}>Add to cart</Button>
                </Box>
            </CardContent>
        </Card>
    </Box>
  )
}

export default ProductCard