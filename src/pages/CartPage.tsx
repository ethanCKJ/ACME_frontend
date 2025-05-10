import React, { useMemo } from 'react'
import Header from '../components/Header'
import { Box, TableContainer, Typography, Table, TableHead, TableRow, TableBody, TableCell, Divider, Grid2, FormControl, RadioGroup, FormControlLabel, Radio, Button} from '@mui/material'
import { cartObj, useCart } from '../contexts/CartContext'
import QuantityInput from '../components/QuantityInput'
import { centsToDollar, dollarToCents } from '../components/cent2Dollar'
import { EXPRESS_DELIVERY_FEE, STANDARD_DELIVERY_FEE } from '../components/constants'
interface ColHeaderProps {
  width: number,
  text: string,
  borderText: string,
}

interface FormattedRowProps {
  productName: string,
  imageName: string,
  price: number,
  quantity: number,
  index: number,
}

function CartPage() {
  const {addToCart, cartContent, adjustQuantity, setDeliveryFee, deliveryFee} = useCart();
  const tableWidth=700
  const col2Width=150;
  const col3Width=100;
  const col1Width=tableWidth-col2Width-col3Width
  const ColumnHeader = ({width, text, borderText}: ColHeaderProps) => (
  <Box sx={{width: `${width}px`, paddingLeft:"0px", fontWeight:"bold", borderLeft:""}}>
    <Typography>{text}</Typography>
  </Box>)



  const FormattedRow = ({productName, imageName, price, quantity, index}: FormattedRowProps) => {
    return (
      <TableRow sx={{height:"2px", padding:0, borderBottom:"2px solid grey", borderTop:"2px solid red"}}>
        <TableCell sx={{padding:"10px 5px", display:"flex"}}>
        <img
        src={`images/cookies/${imageName}.webp`}
        width="150px"
        >
        </img>
        <Box sx={{display:"flex", marginLeft:"10px", flexDirection:"column"}}>
          <Typography fontWeight={"bold"} fontSize={"16px"}>{productName}</Typography>
          <Typography>{`$${centsToDollar(price)}`}</Typography>
        </Box>
        </TableCell>
        <TableCell sx={{padding:"5px"}}><Box sx={{display:"flex", justifyContent:"center"}}><QuantityInput quantity={quantity} setQuantity={(newQuantity: number) => adjustQuantity(index,newQuantity)}/></Box></TableCell>
        <TableCell sx={{padding:"5px", fontSize:"16px", textAlign:"center"}}>{centsToDollar(price * quantity)}</TableCell>
      </TableRow>
    )
  }

  const SummaryPanel = () => {
    let total = useMemo(()=>{
      console.log("Recomputing SummaryPanel")
      let sum = 0;
      cartContent.forEach((value) => sum = sum + (value.price * value.quantity))
      return sum;
    }, [cartContent])
    return(
    <Box sx={{width:"250px", background:"white", height:"fit-content", display:"flex", flexDirection:"column", alignItems:"center", padding:"2px"}}>
      <Typography fontSize={"30px"} fontWeight={"bold"}>Summary</Typography>
      <Box sx={{borderTop:"2px solid black", width:"100%"}}>
        <Grid2 container spacing={2} sx={{padding:"2px"}}>
          <Grid2 size={8}>
            Product Total:
          </Grid2>
          <Grid2 size={4}>
            {centsToDollar(total)}
          </Grid2>
          <Grid2 size={8}>
            Delivery:
            <FormControl>
              <RadioGroup onChange={(e) => {
                if (parseInt(e.target.value) === STANDARD_DELIVERY_FEE){
                  setDeliveryFee(STANDARD_DELIVERY_FEE);
                }
                else{
                  setDeliveryFee(EXPRESS_DELIVERY_FEE);
                }
              }} value={deliveryFee}>
                {/* Problem here is selection (value of RadioGroup) is not tied to deliveryFee state to need to double click */}
                <FormControlLabel value={STANDARD_DELIVERY_FEE} control={<Radio/>} label={`standard $${centsToDollar(STANDARD_DELIVERY_FEE)}`} labelPlacement='end'/>
                <FormControlLabel value={EXPRESS_DELIVERY_FEE} control={<Radio/>} label={`express $${centsToDollar(EXPRESS_DELIVERY_FEE)}`} labelPlacement='end'/>
              </RadioGroup>
            </FormControl>
          </Grid2>
          <Grid2 size={4}>
            {centsToDollar(deliveryFee)}
          </Grid2>
          <Grid2 size={8}>
            Total:
          </Grid2>
          <Grid2 size={4}>
            {centsToDollar(total + deliveryFee)}
          </Grid2>
          <Grid2 size={12} sx={{display:"flex", justifyContent:"center",marginBottom:"10px"}}>
            <Button variant="contained" href="/checkout">Proceed to checkout</Button>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  )}
  return (
    <>
      <Header/>
      <Box sx={{width:"100%", minHeight:"100%", backgroundColor: "beige", display:"flex", justifyContent:"center", columnGap:"20px", paddingTop:"20px"}}>
        <Box sx={{width:`${tableWidth}px`, background:"white", height:"fit-content", padding:"10px"}}>
          <Typography fontSize={"42px"}>My Shopping Cart</Typography>
          <TableContainer>
            <Table sx={{width:"100%"}} size="small">
              <TableHead>
                <TableRow sx={{height:"2px", background:"orange"}}>
                  <TableCell sx={{borderRight:"2px black solid", fontWeight:"bold",  width:"450px"}}>Product</TableCell>
                  <TableCell sx={{borderRight:"2px black solid", fontWeight:"bold", }}>Quantity</TableCell>
                  <TableCell sx={{borderRight:"", fontWeight:"bold"}}>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartContent.map((value, index) => <FormattedRow key={index} 
                productName={value.productName} 
                imageName={value.imageName} 
                price={value.price} 
                quantity={value.quantity}
                index={index}
                />)}
              </TableBody>

            </Table>

          </TableContainer>
        </Box>
          <SummaryPanel/>
        
      </Box>
    </>
  )
}

export default CartPage