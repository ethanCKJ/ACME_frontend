import React, {ReactNode, useState} from 'react'
import Sidebar from "../components/global/Sidebar.tsx";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function ManageOrderPage() {
  const [tabValue, setTabValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
      <>
        <Sidebar/>
        <Box sx={{width:"100%", background:"ivory", height:"100%", padding:"5px 20px"}}>
          <Box sx={{ width: '100%', display:"flex", justifyContent:"center", columnGap:"20px", alignItems:"center"}}>
            <Tabs value={tabValue} onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  variant="fullWidth"
                  sx={{width:"800px"}}
            >
                  <Tab label="Not ready" value="1" />
                  <Tab label="Ready to ship" value="2" />
                  <Tab label="Dispatched" value="3" />
                  <Tab label="Fulfilled" value="4" />
                  <Tab label="Cancelled" value="5" />
            </Tabs>
            <Button variant={"contained"} sx={{height:"30px"}}>Refresh</Button>
          </Box>
          <Box sx={{display:"flex", flexDirection:"column",marginTop:"20px"}}>
            <Accordion>
              <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
              >
                <Typography component="span">Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </>
  )
}

export default ManageOrderPage
