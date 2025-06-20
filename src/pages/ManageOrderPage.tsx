import React, {useEffect, useState} from 'react'
import Sidebar from '../components/global/Sidebar.tsx';
import OrderTabs from "../components/dashboard/OrderTabs";
import api from "../components/api";
import {Box, Button} from "@mui/material";
import OrderAccordion from "../components/dashboard/OrderAccordion";
import {ProductCategory} from "../components/global/types";

export enum OrderState {
  NOT_READY = "NOT_READY",
  READY_TO_SHIP = "READY_TO_SHIP",
  DISPATCHED = "DISPATCHED",
  FULFILLED = "FULFILLED",
  CANCELLED = "CANCELLED"
}

export interface StaffOrderDetail {
  productId: number,
  productName: string,
  quantity: number,
  category: ProductCategory,
}

export interface StaffOrder {
  orderId: number,
  customerName: string,
  email: string,
  phone: string,
  addressLine1: string,
  addressLine2: string,
  addressLine3: string,
  postcode: string,
  city: string,
  orderDetails: StaffOrderDetail[],
  requiredDate: Date,
  dispatchDate: Date | null,
  orderState: OrderState,
}

function ManageOrderPage() {
  const [tabValue, setTabValue] = useState(OrderState.NOT_READY);
  const handleChange = (event: React.SyntheticEvent, newValue: OrderState) => {
    setTabValue(newValue);
  };
  const [staffOrders, setStaffOrders] = useState([])
  const loadOrders = async () => {
    try {
      const res = await api.get(`/view_orders?orderState=${tabValue.valueOf()}`)
      console.log(res)
      setStaffOrders(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    loadOrders()
  }, [tabValue]);


  return (
      <>
        <Sidebar/>
        <Box sx={{width: "100%", background: "ivory", height: "100%", padding: "5px 20px"}}>
          <Box sx={{
            width: '100%',
            display: "flex",
            justifyContent: "center",
            columnGap: "20px",
            alignItems: "center"
          }}>
            <OrderTabs tabValue={tabValue} handleChange={handleChange}/>
            <Button variant={"contained"} sx={{height: "30px"}}
                    onClick={loadOrders}>Refresh</Button>
          </Box>
          <Box sx={{display: "flex", flexDirection: "column", marginTop: "20px", rowGap: "10px"}}>
            {staffOrders.length > 0 ? staffOrders.map((value: StaffOrder, idx) => <OrderAccordion
                key={value.orderId} index={idx} staffOrder={value} setStaffOrders={setStaffOrders}
                staffOrders={staffOrders}/>) : <p>No orders to show</p>}
          </Box>
        </Box>
      </>
  )
}

export default ManageOrderPage
