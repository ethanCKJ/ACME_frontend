import React, { useState } from 'react'
import { Box, Card, CardContent, CardMedia, Typography, Button, Dialog, IconButton, TextField } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
interface ProductCardProps {
    productId: number,
    imageName: string,
    addToCart: (productId: number, quantity: number) => void,
    productName: string,
    description: string,
    price: number,
}
// function ProductModal(){

// }
function ProductCard({productId, imageName, addToCart, productName, description, price}: ProductCardProps) {
    const [open, setOpen] = useState<boolean>(false);
    description="foo"
    // Why make a separate function with arguments when you can just use the local variables?
    const ProductModal = () => {
        const handleQuantityIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
            setQuantity(quantity+1)
        }
        const handleQuantityDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
            setQuantity(quantity-1)
        }
        const [quantity, setQuantity] = useState<number>(1);
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
                        <Typography>{description}</Typography>
                        <Typography>{`Price \$${price} per cookie`}</Typography>
                        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <Typography>Quantity</Typography>
                            <Box sx={{display:"flex"}}>
                                <button onClick={handleQuantityIncrement}>Add</button>
                                <IconButton type="button" onClick={handleQuantityIncrement} autoFocus>
                                    <AddBoxOutlinedIcon/>
                                </IconButton>
                                <Box sx={{width:"80px",height:"auto", margin:"3px 0px", padding:0, border: "2px solid grey", display:"flex", justifyContent:"center", alignItems:"center"}}><Typography>{quantity}</Typography></Box>
                                <IconButton>
                                    <IndeterminateCheckBoxOutlinedIcon/>
                                </IconButton>
                            </Box>
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