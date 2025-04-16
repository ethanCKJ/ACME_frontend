import React, { useState } from 'react'
import { Box, Card, CardContent, CardMedia, Typography, Button, Dialog, IconButton, TextField, useTheme } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
interface ProductCardProps {
    productId: number,
    imageName: string,
    addToCart: (productId: number, quantity: number) => void,
    productName: string,
    productInfo: string,
    price: number,
}
// function ProductModal(){

// }
function ProductCard( {productId, imageName, addToCart, productName, productInfo, price}: ProductCardProps) {
    const [open, setOpen] = useState<boolean>(false);
    productInfo="foo"
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
        console.log(theme)
        
        return(
            <Dialog
            open={open}
            onClose={() => setOpen(false)}
            >
                <Box sx={{width:"450px", m:0, p:0}}>
                    <img
                    src={`/images/cookies/${imageName}`}
                    width="450px"
                    height="300px"
                    alt={productName}
                    >
                    </img>
                    <Box sx={{padding: "5px 0px 10px 10px"}}>
                        <Typography variant="body1" fontSize={"18px"}>{productName}</Typography>
                        {/* Default Typography is already body1 */}
                        <Typography>{productInfo}</Typography>
                        <Typography>{`Price \$${price} per cookie`}</Typography>
                        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding: "0px 5px"}}>
                            <Typography>Quantity</Typography>
                            <Box sx={{display:"flex"}}>
                                <IconButton onClick={handleQuantityIncrement} color='primary' >
                                    <AddBoxOutlinedIcon/>
                                </IconButton>
                                <Box sx={{width:"70px",height:"30px", margin:"3px 0px", padding:0, border: `2px solid ${theme.palette.primary.main}`, display:"flex", justifyContent:"center", alignItems:"center"}}><Typography>{quantity}</Typography></Box>
                                <IconButton onClick={handleQuantityDecrement} color='primary'>
                                    <IndeterminateCheckBoxOutlinedIcon/>
                                </IconButton>
                            </Box>
                            <Button variant="outlined" >
                                Add to shopping cart
                            </Button>
                        </Box>
                        
                        
                    </Box>


                </Box>
            </Dialog>
        )
    }
    
    productName="White Chocolate and Macadamia nut cookie"
    imageName="mint_cookie.webp"
  return (
    <Box sx={{minWidth: "320px", padding:0}}>
        <ProductModal/>
        <Card sx={{paddingBottom: 0}}>
            <CardMedia
            component="img"
            alt={productName}
            height="214"
            image={`/images/cookies/${imageName}`}
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