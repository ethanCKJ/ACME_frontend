import React from 'react'
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {StaffOrder} from "../../pages/ManageOrderPage";

interface OrderAccordionProps {
  staffOrders: StaffOrder,
  setStaffOrders: React.Dispatch<React.SetStateAction<never[]>>
}
const nameCharLimit = 15;
function OrderAccordion({staffOrders, setStaffOrders} : OrderAccordionProps) {
  let displayName = staffOrders.customerName;
  if (staffOrders.customerName.length > nameCharLimit){
    displayName = staffOrders.customerName.substring(0, nameCharLimit) + "..."
  }
  return (
      <Accordion disableGutters>
        <AccordionSummary
            expandIcon={<ArrowDropDownIcon/>}
            aria-controls="panel2-content"
            id="panel2-header"
        >
          <Typography component="span">{`#${staffOrders.orderId} ${displayName} Due ${staffOrders.requiredDate}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
  )
}

export default OrderAccordion
