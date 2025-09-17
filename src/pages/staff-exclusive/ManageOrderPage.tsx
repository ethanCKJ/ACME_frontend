import React, {useEffect, useState} from "react";
import Sidebar from "../../components/Sidebar";
import OrderTabs from "../../features/manage-orders/components/OrderTabs";
import api from "../../utils/api";
import {Box, Button, Snackbar} from "@mui/material";
import OrderAccordion from "../../features/manage-orders/components/OrderAccordion";
import {ProductCategory} from "../../types/types";
import {OrderState} from "../../features/manage-orders/types/OrderState";

export interface StaffOrderDetail {
  productId: number;
  productName: string;
  quantity: number;
  category: ProductCategory;
}

export interface StaffOrder {
  orderId: number;
  customerName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  postcode: string;
  city: string;
  orderDetails: StaffOrderDetail[];
  requiredDate: Date;
  dispatchDate: Date | null;
  orderState: OrderState;
}

/**
 * Page for staff to view all orders and mark orders as ready for dispatch, dispatched, fulfilled, or cancelled.
 * @constructor
 */
function ManageOrderPage() {
  const [tabValue, setTabValue] = useState(OrderState.NOT_READY);
  const [open, setOpen] = useState(false);
  const [staffOrders, setStaffOrders] = useState<StaffOrder[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: OrderState) => {
    setTabValue(newValue);
  };
  const loadOrders = async () => {
    try {
      const res = await api.get(
        `/view_orders?orderState=${tabValue.valueOf()}`,
      );
      setStaffOrders(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    loadOrders();
  }, [tabValue]);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={800}
        message="Orders up to date"
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <Sidebar title="Manage Orders" />
      <Box
        sx={{
          width: "100%",
          background: "ivory",
          height: "100%",
          padding: "5px 20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            columnGap: "20px",
            alignItems: "center",
          }}
        >
          <OrderTabs tabValue={tabValue} handleChange={handleChange} />
          <Button
            variant={"contained"}
            sx={{ height: "30px" }}
            onClick={() => {
              loadOrders();
              setOpen(true);
            }}
          >
            Refresh
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            rowGap: "10px",
          }}
        >
          {staffOrders.length > 0 ? (
            staffOrders.map((value: StaffOrder, idx) => (
              <OrderAccordion
                key={value.orderId}
                index={idx}
                staffOrder={value}
                setStaffOrders={setStaffOrders}
                staffOrders={staffOrders}
              />
            ))
          ) : (
            <p>No orders to show</p>
          )}
        </Box>
      </Box>
    </>
  );
}

export default ManageOrderPage;
