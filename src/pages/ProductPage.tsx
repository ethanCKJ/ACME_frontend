import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import Header from "../components/home/Header";
import ProductCard from "../components/product/ProductCard";
import ShoppingCartPanel from "../components/product/ShoppingCartPanel";
import { centsToDollar } from "../utils/cent2Dollar";
import { ProductCategory } from "../components/global/types";

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

interface FilterPanelProps {
  priceRange: number[];
  handleSliderUpdate: (e: Event, value: number | number[]) => void;
  getProducts: () => void;
}

const sortOrderOptions = [
  "Popularity",
  "Price high to low",
  "Price low to high",
  "A to Z",
  "Z to A",
];
const maxPrice = 1000;
const minPrice = 0;

const FilterPanel = ({
  priceRange,
  handleSliderUpdate,
  getProducts,
}: FilterPanelProps) => (
  <Box sx={{ minWidth: "200px", padding: "5px" }}>
    <Typography fontSize={24}>Filter by</Typography>
    <hr></hr>
    <Typography fontSize={16}>Price</Typography>
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Slider
        getAriaLabel={() => "Select maximum and minimum price"}
        value={priceRange}
        onChange={handleSliderUpdate}
        sx={{ width: "180px" }}
        disableSwap
        min={minPrice}
        max={maxPrice}
      />
    </Box>
    <Box
      sx={{
        display: "flex",
        wrap: "nowrap",
        marginTop: "10px",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", margin: 0, padding: 0 }}
      >
        <Typography fontSize={"14px"} sx={{ marginLeft: "2px" }}>
          Min
        </Typography>
        <Typography
          sx={{
            border: "1px solid black",
            width: "50px",
            padding: "0px 2px",
            borderRadius: "4px",
          }}
        >
          {centsToDollar(priceRange[0])}
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", margin: 0, padding: 0 }}
      >
        <Typography fontSize={"14px"} sx={{ marginLeft: "2px" }}>
          Max
        </Typography>
        <Typography
          sx={{
            border: "1px solid black",
            width: "50px",
            padding: "0px 2px",
            borderRadius: "4px",
          }}
        >
          {centsToDollar(priceRange[1])}
        </Typography>
      </Box>
    </Box>
    <Button
      variant="outlined"
      sx={{ padding: "2px", marginTop: "10px" }}
      onClick={() => getProducts()}
    >
      Apply
    </Button>
  </Box>
);

const NoProductsAvailable = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "800px",
          height: "200px",
          border: `5px solid ${theme.palette.primary.light}`,
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4">No products match your filter</Typography>
      </Box>
    </Box>
  );
};

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
