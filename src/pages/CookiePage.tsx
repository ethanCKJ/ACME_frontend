import { Box, FormControl, MenuItem, Select, Slider, TextField, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../components/api'
import Header from '../components/home/Header'
import ProductCard from '../components/ProductCard'
import ShoppingCartPanel from '../components/ShoppingCartPanel'
import { useCart } from '../contexts/CartContext'
import { centsToDollar, dollarToCents } from '../components/cent2Dollar'
import {ProductCategory} from "../components/global/types";

interface Product {
    id: number,
    productInfo: string,
    stock: number,
    price: number,
    productCategory: ProductCategory,
    imageName: string,
    productName: string,
    isDiscontinued: boolean
}
const sortOrderOptions = ["Popularity", "Price high to low", "Price low to high", "A to Z", "Z to A",]
function CookiePage() {
    // define min and max price values - have defaults
    const maxPrice = 1000
    const minPrice = 0
    const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice])
    // const [displayRange, setDisplayRange] = useState<number | string[]>([minPrice, maxPrice])
    const [sortOrder, setSortOrder] = useState<string>("Popularity")
    const clip = (val: number, min: number, max: number) => {
        return Math.min(Math.max(min, val), max)
    }
    const [products, setProducts] = useState<Product[]>([])
    const theme = useTheme();
    const { addToCart } = useCart();

    const getProducts = async (category: string) => {
        try {
            const res = await api.get(`/products/${category}?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`)
            if (res.status === 200) {
                setProducts(res.data)
            }
            else {
                console.log("Error in response")
                console.log(res)
            }
        }
        catch (error) {
            console.log(error)

        }
    }
    useEffect(() => { getProducts("cookie") }, [])

    const handleSliderUpdate = (event: Event,
                                newPriceRange: number[],
                                ) => {
        console.log(newPriceRange)
        setPriceRange(newPriceRange);
    }

    const handleSortOrderChange = (event: Event) => {
        const newOrder = event.target.value;
        if (newOrder !== null && newOrder !== sortOrder) {
            setSortOrder(newOrder)
            // sort the data
            switch (newOrder){
                case "Price high to low": products.sort((a, b) => b.price - a.price); break;
                case "Price low to high": products.sort((a, b) => a.price - b.price); break;
                case "A to Z": products.sort((a, b) => a.productName.localeCompare(b.productName)); break;
                case "Z to A": products.sort((a, b) => b.productName.localeCompare(a.productName)); break;
                default:
                    products.sort((a,b) => a.id - b.id)
            }
        }
    }

    const NoProductsAvailable = () => {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "800px", height: "200px", border: `5px solid ${theme.palette.primary.light}`, borderRadius: "10px" }}>
                    <Typography variant="h4">No products match your filter</Typography>
                </Box>
            </Box>)
    }



    return (
        <>
            <Header />
            <Box sx={{ display: "flex", width: "100%", minHeight: "100%", padding: "0px 20px", background: "beige"}}>
                {/* Filter panel */}
                <Box sx={{ minWidth: "200px", padding: "5px" }}>
                    <Typography variant="body1" fontSize={24}>Filter by</Typography>
                    <hr></hr>
                    <Typography variant="body1" fontSize={16}>Price</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Slider
                            getAriaLabel={() => 'Select maximum and minimum price'}
                            value={priceRange}
                            onChange={handleSliderUpdate}
                            sx={{ width: "180px" }}
                            disableSwap
                            min={minPrice}
                            max={maxPrice}
                            onBlur={() => getProducts("cookie")}
                        />
                    </Box>
                    <Box sx={{ display: "flex", wrap: "nowrap", marginTop: "10px", justifyContent: "space-between" }}>
                        <Box sx={{display:"flex", flexDirection:"column", margin:0, padding:0}}>
                            <Typography fontSize={"14px"} sx={{marginLeft:"2px"}}>Min</Typography>
                            <Typography sx={{border: "1px solid black", width:"50px", padding:"0px 2px", borderRadius:"4px"}} >{centsToDollar(priceRange[0])}</Typography>
                        </Box>
                        <Box sx={{display:"flex", flexDirection:"column", margin:0, padding:0}}>
                            <Typography fontSize={"14px"} sx={{marginLeft:"2px"}}>Max</Typography>
                            <Typography sx={{border: "1px solid black", width:"50px", padding:"0px 2px", borderRadius:"4px"}} >{centsToDollar(priceRange[1])}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    {/* Header bar */}
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                        <Typography variant="h3" align='center' flexGrow={1}>Cookies</Typography>
                        <FormControl sx={{ m: 1, padding: "0" }}>
                            <Select
                                sx={{ width: "170px", '& .MuiSelect-select': { paddingLeft: "10px", paddingRight: "0px", textAlign: "center" } }}
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
                    {/* Main products display */}
                    {(products === undefined || products.length == 0) ?
                        <NoProductsAvailable />
                        :
                        <Box sx={{ display: "flex", justifyContent: "start", columnGap: "30px", rowGap: "30px", marginLeft: "20px", flexWrap: "wrap" }}>
                            {products.map((data, index) => <ProductCard key={index} productId={data.id} imageName={data.imageName} productName={data.productName} productInfo={data.productInfo} price={data.price} addToCart={addToCart} />)}
                        </Box>

                    }
                </Box>
                <ShoppingCartPanel />

            </Box>
        </>
    )
}

export default CookiePage