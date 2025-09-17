import React from "react";
import { Tab, Tabs } from "@mui/material";

import {OrderState} from "../types/OrderState";

interface OrderTabsProps {
  tabValue: OrderState;
  handleChange: (event: React.SyntheticEvent, newValue: OrderState) => void;
}
function OrderTabs({ tabValue, handleChange }: OrderTabsProps) {
  return (
    <Tabs
      value={tabValue}
      onChange={handleChange}
      textColor="secondary"
      indicatorColor="secondary"
      variant="fullWidth"
      sx={{ width: "800px" }}
    >
      <Tab label="Not ready" value={OrderState.NOT_READY} />
      <Tab label="Ready to ship" value={OrderState.READY_TO_SHIP} />
      <Tab label="Dispatched" value={OrderState.DISPATCHED} />
      <Tab label="Fulfilled" value={OrderState.FULFILLED} />
      <Tab label="Cancelled" value={OrderState.CANCELLED} />
    </Tabs>
  );
}

export default OrderTabs;
