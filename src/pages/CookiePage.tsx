import React from 'react'
import Header from '../components/Header'
import { Box, Grid2, Slider, Typography, Input, TextField, FormControl, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { Recommend } from '@mui/icons-material'

const sortOrderOptions = ["Recommended","Price high to low","Price low to high","A to Z","Z to A",]
function CookiePage() {
    // define min and max price values - have defaults
    const [priceRange, setPriceRange] = useState<number[]>([0, 100])
    const [displayRange, setDisplayRange] = useState<number | string[]>([0, 100])
    const [sortOrder, setSortOrder] = useState<string>("Recommended")
    const clip = (val: number, min: number, max: number) => {
        return Math.min(Math.max(min, val), max)
    }
    const maxPrice = 100
    const minPrice = 0
    const handleSliderUpdate = (event: Event, newPriceRange: (number | string)[]) => {
        console.log('npr' + newPriceRange)
        let min = priceRange[0]
        let max = priceRange[1]
        if (newPriceRange[0] !== '' && newPriceRange[1] !==  ''){
            max = clip(newPriceRange[1], minPrice, maxPrice)
            min = clip(newPriceRange[0], minPrice, max)
            setPriceRange([min, max]);
        }
        setDisplayRange([min, max])
    }

    const handleSortOrderChange = (event: Event) => {
        let newOrder = event.target.value;
        if (newOrder !== null && newOrder !== sortOrder){
            // sort the data
        }
    }



    // create a slider
    // have value be changes
    // use min and max in client-side filtering

    return (
        <>
            <Header/>
            <Box sx={{display:"flex", width: "100%", minHeight: "800px", padding: "0px 20px", background: "beige", }}>
                <Box sx={{width: "220px", padding:"5px"}}>
                    <Typography variant="body1" fontSize={24}>Filter by</Typography>
                    <hr></hr>
                    <Typography variant="body1" fontSize={16}>Price</Typography>
                    <Box sx={{display:"flex", justifyContent:"center"}}>
                        <Slider
                        getAriaLabel={() => 'Select maximum and minimum price'}
                        value={priceRange}
                        onChange={handleSliderUpdate}
                        sx={{width:"180px"}}
                        disableSwap
                        />
                    </Box>
                    <Box sx={{display:"flex", wrap:"nowrap", marginTop:"15px", justifyContent:"space-between"}}>
                            <TextField label="Min" variant="standard" type="number" value={displayRange[0]} onChange={(e:Event) => {setDisplayRange([e.target.value, displayRange[1]])}} onBlur={()=>handleSliderUpdate(null, displayRange)} sx={{width:"50px"}}/>
                            <TextField label="Max" variant="standard" type="number" value={displayRange[1]} onChange={(e:Event) => {setDisplayRange([displayRange[0], e.target.value])}} onBlur={()=>handleSliderUpdate(null, displayRange)} sx={{width:"50px"}}/>
                    </Box>
                </Box>
                <Box sx={{flexGrow: 1}}>
                    {/* You need a display:"flex" parent to put components side by side. flexGrow=1 means I take up the maximum free space in a side-by-side context */}
                    {/* This box is the header bar */}
                    <Box sx={{display:"flex", alignItems: 'center'}}>
                        <Typography variant="h3" align='center' flexGrow={1}>Cookies</Typography>
                        <FormControl sx={{minWidth: "120px", m:1}}>
                            <Select
                            value={sortOrder}
                            onChange={handleSortOrderChange}
                            defaultValue={sortOrderOptions[0]}
                            >
                                <MenuItem value={sortOrderOptions[0]}>{sortOrderOptions[0]}</MenuItem>
                                <MenuItem value={sortOrderOptions[1]}>{sortOrderOptions[1]}</MenuItem>
                                <MenuItem value={sortOrderOptions[2]}>{sortOrderOptions[2]}</MenuItem>
                                <MenuItem value={sortOrderOptions[3]}>{sortOrderOptions[3]}</MenuItem>
                                <MenuItem value={sortOrderOptions[4]}>{sortOrderOptions[4]}</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    foo
                </Box>
                
            </Box>
        </>
    )
}

export default CookiePage