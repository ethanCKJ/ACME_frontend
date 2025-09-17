import {Box, Typography} from "@mui/material";

/**
 * Message stating no products are available given the current filter
 * @constructor
 */
export const NoProductsAvailable = () => {
  return (
      <Box
          sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
      >
        <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "800px",
              height: "200px",
              border: `5px solid black`,
              borderRadius: "10px",
            }}
        >
          <Typography variant="h4">No products match your filter</Typography>
        </Box>
      </Box>
  );
};