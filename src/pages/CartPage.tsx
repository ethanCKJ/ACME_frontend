import React from 'react'
import Header from '../components/Header'
import { Box, TableContainer, Typography, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material'
import { useCart } from '../contexts/CartContext'
interface ColHeaderProps {
  width: number,
   text: string,
   borderText: string
}
function CartPage() {
  const {addToCart, cartContent} = useCart();
  console.log(cartContent)
  const tableWidth=700
  const col2Width=150;
  const col3Width=100;
  const col1Width=tableWidth-col2Width-col3Width
  console.log(col1Width)
  const ColumnHeader = ({width, text, borderText}: ColHeaderProps) => (
  <Box sx={{width: `${width}px`, paddingLeft:"0px", fontWeight:"bold", borderLeft:""}}>
    <Typography>{text}</Typography>
  </Box>)
  return (
    <>
      <Header/>
      <Box sx={{width:"100%", minHeight:"100%", backgroundColor: "beige", display:"flex", justifyContent:"center", columnGap:"20px", paddingTop:"20px"}}>
        <Box sx={{width:`${tableWidth}px`, background:"white", height:"fit-content", padding:"10px"}}>
          <Typography fontSize={"42px"}>My Shopping Cart</Typography>
          <TableContainer>
            <Table sx={{width:"100%"}}>
              <TableHead>
                <TableRow sx={{height:"2px", background:"orange", padding:0}}>
                  <TableCell sx={{borderRight:"2px black solid", fontWeight:"bold", padding:"5px", minWidth:"400px", width:"400px"}}>Product</TableCell>
                  <TableCell sx={{borderRight:"2px black solid", fontWeight:"bold", padding:"5px"}}>Product</TableCell>
                  <TableCell sx={{borderRight:"", fontWeight:"bold", padding:"5px"}}>Product</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{height:"2px", padding:0, borderBottom:"2px solid grey", borderTop:"2px solid red"}}>
                  <TableCell sx={{padding:"5px", display:"flex"}}>
                    <img
                    src="images/cookies/mint_cookie.webp"
                    width="100px"
                    >
                    </img>
                    <Box sx={{display:"flex", marginLeft:"10px"}}>
                      <Typography fontWeight={"bold"} fontSize={"16px"}>White chocolate and macadamia nut cookie extra large</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{padding:"5px"}}>Product</TableCell>
                  <TableCell sx={{padding:"5px"}}>Product</TableCell>
                </TableRow>

              </TableBody>

            </Table>

          </TableContainer>
        </Box>
        <Box sx={{width:"250px", background:"white", height:"fit-content"}}>
          SUMMARY
        </Box>
      </Box>
    </>
  )
}

export default CartPage