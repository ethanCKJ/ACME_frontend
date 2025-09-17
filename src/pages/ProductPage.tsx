import {Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography,} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import api from "../utils/api";
import Header from "../features/home/Header";
import ProductCard from "../features/product/components/ProductCard";
import ShoppingCartPanel from "../features/product/components/ShoppingCartPanel";
import {ProductCategory} from "../types/types";
import {maxPrice, minPrice, sortOrderOptions} from "../features/product/constants/product-contants";
import {FilterPanel} from "../features/product/components/FilterPanel";
import {NoProductsAvailable} from "../features/product/components/NoProductsAvailable";

interface ProductPageProps {
  category: string;
}

interface Product {
  id: number;
  productInfo: string;
  stock: number;
  price: number;
  productCategory: ProductCategory;
  imageName: string;
  productName: string;
  isDiscontinued: boolean;
}

/**
 * Page displaying all products in a given category, with filtering and sorting options.
 * @param category
 * @constructor
 */
function ProductPage({ category }: ProductPageProps) {
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);
  const [sortOrder, setSortOrder] = useState<string>("Popularity");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async (category: string) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/products/${category}?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`,
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  // Gets products once when component is loaded.
  useEffect(() => {
    getProducts(category);
  }, []);

  const handleSortOrderChange = (event: SelectChangeEvent<string>) => {
    const newOrder = event.target.value;
    if (newOrder !== sortOrder) {
      setSortOrder(newOrder);
    }
  };

  const displayedProducts = useMemo(() => {
    let newArray = [];
    switch (sortOrder) {
      case "Price high to low":
        newArray = products.toSorted((a, b) => b.price - a.price);
        break;
      case "Price low to high":
        newArray = products.toSorted((a, b) => a.price - b.price);
        break;
      case "A to Z":
        newArray = products.toSorted((a, b) =>
          a.productName.localeCompare(b.productName),
        );
        break;
      case "Z to A":
        newArray = products.toSorted((a, b) =>
          b.productName.localeCompare(a.productName),
        );
        break;
      default:
        newArray = products.toSorted((a, b) => a.id - b.id);
    }
    return newArray;
  }, [sortOrder, products]);

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
          padding: "0px 20px",
          background: "beige",
        }}
      >
        {/* Filter panel */}
        <FilterPanel
          priceRange={priceRange}
          handleSliderUpdate={(event, value) => {
            setPriceRange(typeof value === "number" ? [value, value] : value);
          }}
          getProducts={() => getProducts(category)}
        />
        <Box sx={{ flexGrow: 1 }}>
          {/* Header bar */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h3" align="center" flexGrow={1}>
              Cookies
            </Typography>
            <FormControl sx={{ m: 1, padding: "0" }}>
              <Select
                sx={{
                  width: "170px",
                  "& .MuiSelect-select": {
                    paddingLeft: "10px",
                    paddingRight: "0px",
                    textAlign: "center",
                  },
                }}
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <MenuItem value={sortOrderOptions[0]}>
                  {sortOrderOptions[0]}
                </MenuItem>
                <MenuItem value={sortOrderOptions[1]}>
                  {sortOrderOptions[1]}
                </MenuItem>
                <MenuItem value={sortOrderOptions[2]}>
                  {sortOrderOptions[2]}
                </MenuItem>
                <MenuItem value={sortOrderOptions[3]}>
                  {sortOrderOptions[3]}
                </MenuItem>
                <MenuItem value={sortOrderOptions[4]}>
                  {sortOrderOptions[4]}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Main products display */}
          {products === undefined || (products.length === 0 && !loading) ? (
            <NoProductsAvailable />
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                columnGap: "30px",
                rowGap: "30px",
                marginLeft: "20px",
                flexWrap: "wrap",
              }}
            >
              {displayedProducts.map((value: Product) => (
                <ProductCard
                  key={value.id}
                  productId={value.id}
                  imageName={value.imageName}
                  productName={value.productName}
                  productInfo={value.productInfo}
                  price={value.price}
                  stock={value.stock}
                  productCategory={value.productCategory}
                />
              ))}
            </Box>
          )}
        </Box>
        <ShoppingCartPanel />
      </Box>
    </>
  );
}

export default ProductPage;
