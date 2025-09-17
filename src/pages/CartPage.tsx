import React from "react";
import Header from "../features/home/Header";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {useCart} from "../contexts/CartContext";
import {FormattedTableRow} from "../features/shoppingcart/components/FormattedTableRow";
import {SummaryPanel} from "../features/shoppingcart/components/SummaryPanel";


/**
 * Page to inspect shopping cart before heading to checkout. Also used to select delivery option.
 * After this page, no more changes to final bill the customer will pay.
 * @constructor
 */
function CartPage() {
  const { cartContent } = useCart();

  return (
    <>
      <Header />
      <Box
        sx={{
          width: "100%",
          minHeight: "100%",
          backgroundColor: "beige",
          display: "flex",
          justifyContent: "center",
          columnGap: "20px",
          paddingTop: "20px",
        }}
      >
        <Box
          sx={{
            width: `700px`,
            background: "white",
            height: "fit-content",
            padding: "10px",
          }}
        >
          <Typography fontSize={"42px"}>My Shopping Cart</Typography>
          <TableContainer>
            <Table sx={{ width: "100%" }} size="small">
              <TableHead>
                <TableRow sx={{ height: "2px", background: "orange" }}>
                  <TableCell
                    sx={{
                      borderRight: "2px black solid",
                      fontWeight: "bold",
                      width: "450px",
                    }}
                  >
                    Product
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "2px black solid", fontWeight: "bold" }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell sx={{ borderRight: "", fontWeight: "bold" }}>
                    Subtotal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartContent.map((value) => (
                  <FormattedTableRow
                    key={value.productId}
                    productId={value.productId}
                    productName={value.productName}
                    imageName={value.imageName}
                    price={value.price}
                    category={value.productCategory}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <SummaryPanel />
      </Box>
    </>
  );
}

export default CartPage;
