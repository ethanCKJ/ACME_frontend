import React from 'react'
import Header from '../components/Header'
import { Box, Grid2, Slider, Typography, Input, TextField } from '@mui/material'
import { useState } from 'react'

function CookiePage() {
    // define min and max price values - have defaults
    const [priceRange, setPriceRange] = useState<number[]>([0, 100])
    const [displayRange, setDisplayRange] = useState<number | string[]>([0, 100])
    const clip = (val: number, min: number, max: number) => {
        return Math.min(Math.max(min, val), max)
    }
    const maxPrice = 100
    const minPrice = 0
    const handleSliderUpdate = (event: Event, newPriceRange: (number | string)[]) => {
        console.log(newPriceRange)
        let min = priceRange[0]
        let max = priceRange[1]
        if (newPriceRange[0] !== '' && newPriceRange[1] !==  ''){
            max = clip(newPriceRange[1], minPrice, maxPrice)
            min = clip(newPriceRange[0], minPrice, max)
            setPriceRange([min, max]);
        }
        setDisplayRange([min, max])
    }
    const handleMinChange = (event: Event) =>{
        // Need to explicitly convert to number
        // setPriceRange(event.target.value === null ? [textFieldRange[0], textFieldRange[1]] : [Math.max(0, Number(event.target.value)), priceRange[1]])
        // Empty textfield in number mode is '' not null
        console.log(event.target.value)
        setDisplayRange(event.target.value === '' ? ['', displayRange[1]] : [Number(event.target.value), displayRange[1]])
        // Below would interpret '' as 0 preventing backspace
        // setTextFieldRange([Number(event.target.value), textFieldRange[1]])
    }
    const handleOnBlue = () =>{
        console.log("BLurre")
    }

    // create a slider
    // have value be changes
    // use min and max in client-side filtering

    return (
        <>
            <Header/>
            <div>CookiePage</div>
            <Box sx={{display:"flex", width: "100%", minHeight: "800px", padding: "10px", background: "beige"}}>
                <Box sx={{width: "200px"}}>
                    <Typography variant="body1" fontSize={24}>Filter by</Typography>
                    <hr></hr>
                    <Grid2 container spacing={2} sx={{alignItems: 'center'}}>
                        <Grid2>
                            <Input 
                            value={priceRange[0]}
                            // defaultValue={''}
                            size="small"
                            onChange={handleMinChange}
                            // onSubmit only works as part of forms
                            // onSubmit={handleMinChange}
                            // Text field supports backspacing the entire number while Input with type="number" always starts with
                            // value={priceRange[0] === 0 ? '' : priceRange[0]}
                            // defaultValue={minPrice} cannot bave this and value at the same time. controlled vs uncontrolled.
                            type="number"
                            />
                            <TextField type="number" value={displayRange[0]} onChange={(e:Event) => {setDisplayRange([e.target.value, displayRange[1]])}} onBlur={()=>handleSliderUpdate(null, displayRange)}/>
                            
                        </Grid2>
                    </Grid2>

                    <Slider
                        getAriaLabel={() => 'Select maximum and minimum price'}
                        value={priceRange}
                        onChange={handleSliderUpdate}
                    />
                </Box>
            </Box>
        </>
    )
}

export default CookiePage