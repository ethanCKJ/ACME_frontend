import React, {useState} from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {OrderState, StaffOrder, StaffOrderDetail} from "../../pages/ManageOrderPage";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import api from '../api';

interface OrderAccordionProps {
  staffOrder: StaffOrder,
  staffOrders: StaffOrder[],
  setStaffOrders: React.Dispatch<React.SetStateAction<never[]>>,
  index: number,
}

interface StyledTypographyProps {
  field: string,
  value: string,
}

const nameCharLimit = 19;
const warningColor = "rgba(255,193,7,0.8)"
const dangerColor = "rgba(255,87,34,0.8)"
const safeColor = "rgba(76,175,80,0.8)"


function OrderAccordion({staffOrder, staffOrders, setStaffOrders}: OrderAccordionProps) {
  const hideDueDate = staffOrder.orderState === OrderState.FULFILLED || staffOrder.orderState === OrderState.CANCELLED;
  const originalState = staffOrder.orderState;
  const [newState, setNewState] = useState(staffOrder.orderState)
  const columns: GridColDef<StaffOrderDetail>[] = [
    {field: "productId", headerName: "Product id", width: 120},
    {field: "productName", headerName: "Name", width: 350},
    {field: "quantity", headerName: "Quantity", width: 120},
    {field: "category", headerName: "category", width: 150},
  ]
  const theme = useTheme();
  let displayName = staffOrder.customerName;
  if (staffOrder.customerName.length > nameCharLimit) {
    displayName = staffOrder.customerName.substring(0, nameCharLimit) + "..."
  }
  const dayDifference = Math.floor((new Date(staffOrder.requiredDate).valueOf() - (Date.now()).valueOf()) / (1000 * 60 * 60 * 24));
  let dayColor = safeColor;
  let message = "days until due"
  if (dayDifference < 0) {
    dayColor = dangerColor;
    message = "days overdue"
  } else if (dayDifference <= 1) {
    dayColor = warningColor;
  }

  const sendNewOrderState = async () => {
    try {
      const res = await api.post("/set_order_state",
          {orderId: staffOrder.orderId, newState: newState})
      // Update local state instead of refetching all data from the database.
      const newItem = staffOrders.filter((va) => va.orderId != staffOrder.orderId)
      setStaffOrders(newItem)
    } catch (e) {
      console.log(e);
      alert("Error in updating state")
    }
  }

  const StyledTypography = ({field, value}: StyledTypographyProps) => (
      <Box sx={{display: "flex"}}>
        <Typography sx={{fontWeight: "bold", width: "140px"}}>{field + ":"}</Typography>
        <Typography>{value}</Typography>
      </Box>
  )
  return (
      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ArrowDropDownIcon/>}>
          <Typography component="span"
                      sx={{width: "230px"}}>{`#${staffOrder.orderId} ${displayName}`}</Typography>
          <Typography component="span"
                      sx={{marginLeft: "20px"}}>{`Due ${staffOrder.requiredDate}`}</Typography>
          {hideDueDate ?
              null
              :
              <Typography component="span" sx={{marginLeft: "20px",padding: "0px 3px",background: dayColor}}>{`${Math.abs(dayDifference)} ${message}`}
              </Typography>}

        </AccordionSummary>
        <AccordionDetails sx={{display: "flex", flexDirection: "column"}}>
          <Box>
            <Divider sx={{
              // make it darker or thicker
              borderColor: 'rgba(0,0,0,0.5)',
              borderBottomWidth: '2px',
            }}/>
            <Typography>Products</Typography>
            <DataGrid
                rows={staffOrder.orderDetails}
                columns={columns}
                getRowId={(param) => param.productId}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableColumnMenu
                disableRowSelectionOnClick
                sx={{
                  '& .MuiDataGrid-cell': {
                    pointerEvents: 'none',
                  },
                  '& .MuiDataGrid-columnHeader--sortable ': {
                    backgroundColor: theme.palette.primary.light,
                    color: "white"
                  },
                  '& .MuiDataGrid-filler': {
                    backgroundColor: theme.palette.primary.light,
                    color: "white"
                  },
                }}
                hideFooter
            />
          </Box>
          <Divider sx={{
            // make it darker or thicker
            borderColor: 'rgba(0,0,0,0.5)',
            borderBottomWidth: '2px',
            margin: "20px 0px"
          }}/>
          <Box>
            <Typography>Customer Details</Typography>
            <StyledTypography field="Name" value={staffOrder.customerName}/>
            <StyledTypography field="Email" value={staffOrder.email}/>
            <StyledTypography field="Phone" value={staffOrder.phone}/>
            <StyledTypography field="Address Line 1" value={staffOrder.addressLine1}/>
            <StyledTypography field="Address Line 2" value={staffOrder.addressLine2}/>
            <StyledTypography field="Address Line 3" value={staffOrder.addressLine3}/>
            <StyledTypography field="Postcode" value={staffOrder.postcode}/>
            <StyledTypography field="City" value={staffOrder.city}/>
            <StyledTypography field="Required Date" value={staffOrder.requiredDate}/>
            {staffOrder.orderState === OrderState.NOT_READY || staffOrder.orderState === OrderState.READY_TO_SHIP ?
                <StyledTypography field="Dispatch date" value="Not yet dispatched"/>
                : <StyledTypography field="Dispatch date" value={staffOrder.dispatchDate}/>
            }
          </Box>
          <Divider sx={{
            // make it darker or thicker
            borderColor: 'rgba(0,0,0,0.5)',
            borderBottomWidth: '2px',
            margin: "20px 0px"
          }}/>
          <Box
              sx={{display: "flex", flexDirection: "row", alignItems: "center", columnGap: "10px"}}>
            <Typography fontSize={"18px"}>Update state</Typography>
            <FormControl variant="standard" sx={{m: 1, minWidth: 200}}>
              <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={newState}
                  onChange={(e: SelectChangeEvent) => setNewState(e.target.value)}
              >
                <MenuItem value={OrderState.NOT_READY}>Not ready</MenuItem>
                <MenuItem value={OrderState.READY_TO_SHIP}>Ready to ship</MenuItem>
                <MenuItem value={OrderState.DISPATCHED}>Dispatched</MenuItem>
                <MenuItem value={OrderState.FULFILLED}>Fulfilled</MenuItem>
                <MenuItem value={OrderState.CANCELLED}>Cancelled</MenuItem>
              </Select>
            </FormControl>
            <Button onClick={
              () => {
                if (newState !== originalState) {
                  sendNewOrderState()
                }
              }} variant="contained">Save</Button>
            {newState !== originalState ?
                <Typography sx={{color: "red"}}>You have unsaved changes</Typography> : null}
          </Box>
        </AccordionDetails>
      </Accordion>
  )
}

export default OrderAccordion
