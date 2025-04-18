import { Box, FormControl, MenuItem, Select, Slider, TextField, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import api from '../components/api'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import ShoppingCartPanel from '../components/ShoppingCartPanel'
import { cartObj } from '../App'
import { useCart } from '../contexts/CartContext'

const sortOrderOptions = ["Popularity", "Price high to low", "Price low to high", "A to Z", "Z to A",]
function CookiePage() {
    // define min and max price values - have defaults
    const [priceRange, setPriceRange] = useState<number[]>([0, 100])
    const [displayRange, setDisplayRange] = useState<number | string[]>([0, 100])
    const [sortOrder, setSortOrder] = useState<string>("Popularity")
    const clip = (val: number, min: number, max: number) => {
        return Math.min(Math.max(min, val), max)
    }
    const maxPrice = 100
    const minPrice = 0
    const [products, setProducts] = useState<object[]>([])
    // const [cartCount, setCartCount] = useState<number>(0)
    // const [cartContent, setCartContent] = useState<cartObj[]>([])
    const theme = useTheme();
    const {cartCount, addToCart} = useCart();

    const getProducts = async (category: string) => {
        try {
            const res = await api.get(`/products/${category}?minPrice=${minPrice}&maxPrice=${maxPrice}`)
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

    const handleSliderUpdate = (event: Event, newPriceRange: (number | string)[]) => {
        let min = priceRange[0]
        let max = priceRange[1]
        if (newPriceRange[0] !== '' && newPriceRange[1] !== '') {
            max = clip(newPriceRange[1], minPrice, maxPrice)
            min = clip(newPriceRange[0], minPrice, max)
            setPriceRange([min, max]);
        }
        setDisplayRange([min, max])
    }

    const handleSortOrderChange = (event: Event) => {
        let newOrder = event.target.value;
        if (newOrder !== null && newOrder !== sortOrder) {
            setSortOrder(newOrder)
            // sort the data
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

    // const addToCart = (productId: number, productName: string, quantity: number, price: number, imageName: string) => {
    //     let updated = false;
    //     const newCartContent = cartContent.map((item) => {
    //         if (item.productId === productId) {
    //             // shallow copy only one item. shallow copying is sufficient given cartObj is made of primitives.
    //             let newItem = { ...item }
    //             newItem.quantity += quantity;
    //             updated = true;
    //             return newItem;
    //         }
    //         return item;
    //     })
    //     if (!updated) {
    //         newCartContent.push({ productId: productId, productName: productName, quantity: quantity, price: price, imageName: imageName })
    //         setCartCount(cartCount => cartCount+=1);
    //     }
    //     setCartContent(newCartContent)
    // }
    return (
        <>
            <Header cartCount={cartCount} />
            <Box sx={{ display: "flex", width: "100%", minHeight: "800px", padding: "0px 20px", background: "beige", }}>
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
                        />
                    </Box>
                    <Box sx={{ display: "flex", wrap: "nowrap", marginTop: "15px", justifyContent: "space-between" }}>
                        <TextField label="Min" variant="standard" type="number" value={displayRange[0]} onChange={(e: Event) => { setDisplayRange([e.target.value, displayRange[1]]) }} onBlur={() => handleSliderUpdate(null, displayRange)} sx={{ width: "50px" }} />
                        <TextField label="Max" variant="standard" type="number" value={displayRange[1]} onChange={(e: Event) => { setDisplayRange([displayRange[0], e.target.value]) }} onBlur={() => handleSliderUpdate(null, displayRange)} sx={{ width: "50px" }} />
                    </Box>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    {/* Header bar */}
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                        <Typography variant="h3" align='center' flexGrow={1}>Cookies</Typography>
                        <FormControl sx={{m: 1, padding:"0" }}>
                            <Select
                                sx={{width:"170px", '& .MuiSelect-select':{paddingLeft: "10px", paddingRight:"0px", textAlign:"center"}}}
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
                <ShoppingCartPanel/>

            </Box>
        </>
    )
}

export default CookiePage