import React, { useState } from 'react'
import { Card, Box, Typography, Button, TextField, FormControl, MenuItem } from '@mui/material'
import { cartObj, useCart } from '../../contexts/CartContext';
import { useCheckout } from '../../contexts/CheckoutContext';
import api from '../api';

interface CardFormProps {
    handleNext: () => void
}

const months = [1,2,3,4,5,6,7,8,9,10,11,12];
const currentYear = (new Date()).getFullYear();
const years = [
    currentYear + 1,
    currentYear + 2,
    currentYear + 3,
    currentYear + 4,
    currentYear + 5,
    currentYear + 6,
]

const reg = new RegExp("^\\d*$")
function validCardNumber(cardNum: string) : boolean {
    return reg.test(cardNum);
}
function CardForm({ handleNext}: CardFormProps) {
    const [cardNum, setCardNum] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const {cartContent} = useCart();
    const {checkoutData} = useCheckout();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log("submit card")
        event.preventDefault();
        console.log(cardNum.length)
        if (cardNum.length === 8){
            const packet = {
                ...cartContent,
                ...checkoutData
            }
            console.log("away!")
            try{
                const res = await api.post("/order", packet)
                console.log(res)
                if (res.status === 200){
                    alert("Successful Purchase!")
                    handleNext()
                }
                else {
                    alert("Error in purchase")
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }
    
    return (
        <Card variant='outlined' sx={{ width: "100%", padding: "10px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography textAlign={"center"} fontSize="32px" fontWeight="bold">Payment details</Typography>
            <Box component="form" 
            onSubmit={handleSubmit}
            sx={{   display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch", 
                    gap: 2, 
                    "& .MuiFormLabel-root": { color: "black" }, 
                    "& .MuiInputBase-input" : {padding:1, minWidth:"100%"}}}>
                <TextField 
                variant='outlined'
                label="Card number"
                helperText="Just type any 8 digits" 
                onChange={(e) => {
                    let val = e.target.value;
                    if (reg.test(val) && val.length <= 8){
                        setCardNum(val);
                    }
                    console.log("Invalid")
                }}
                value={cardNum}
                required
                autoFocus/>
                <Box sx={{display: "flex", gap:5}}>

                <FormControl>
                    <TextField
                    select
                    label="Expiry month"
                    sx={{width:"150px"}}
                    onChange={(e) => setMonth(e.target.value)}
                    value={month}
                    required
                    >
                    {months.map(value => <MenuItem key={value} value={value}>
                    {value}
                    </MenuItem> )
                    }
                    
                    </TextField>
                </FormControl>
                <FormControl>
                    <TextField
                    select
                    label="Expiry year"
                    sx={{width:"150px"}}
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                    required
                    >
                    {years.map(value => <MenuItem key={value} value={value}>
                    {value}
                    </MenuItem> )}
                    </TextField>
                </FormControl>
                </Box>

                
                <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
                    <Button variant='contained' sx={{ width: "50%" }} type="submit">Make payment</Button>
                </Box>
            </Box>
        </Card>
    )
}

export default CardForm