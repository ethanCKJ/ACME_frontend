import {Box, Button, Slider, Typography} from "@mui/material";
import {maxPrice, minPrice} from "../constants/product-contants";
import {centsToDollar} from "../../../utils/cent2Dollar";

interface FilterPanelProps {
  priceRange: number[];
  handleSliderUpdate: (e: Event, value: number | number[]) => void;
  getProducts: () => void;
}

/**
 * Panel for filtering products by price range.
 * @param priceRange
 * @param handleSliderUpdate
 * @param getProducts
 * @constructor
 */
export const FilterPanel = ({
                              priceRange,
                              handleSliderUpdate,
                              getProducts,
                            }: FilterPanelProps) => (
    <Box sx={{minWidth: "200px", padding: "5px"}}>
      <Typography fontSize={24}>Filter by</Typography>
      <hr></hr>
      <Typography fontSize={16}>Price</Typography>
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <Slider
            getAriaLabel={() => "Select maximum and minimum price"}
            value={priceRange}
            onChange={handleSliderUpdate}
            sx={{width: "180px"}}
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
            sx={{display: "flex", flexDirection: "column", margin: 0, padding: 0}}
        >
          <Typography fontSize={"14px"} sx={{marginLeft: "2px"}}>
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
            sx={{display: "flex", flexDirection: "column", margin: 0, padding: 0}}
        >
          <Typography fontSize={"14px"} sx={{marginLeft: "2px"}}>
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
          sx={{padding: "2px", marginTop: "10px"}}
          onClick={() => getProducts()}
      >
        Apply
      </Button>
    </Box>
);