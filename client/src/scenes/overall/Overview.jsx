import React, { useState } from 'react'
import { FormControl,MenuItem,Box,InputLabel,Select } from '@mui/material'
import Header from '../../Components/Header.jsx';
import { OverviewChart } from '../../Components/OverviewChart.jsx';
export default function Overview() {
  const[view,setView] = useState("units");
 
  
   return <Box m="1.5rem 2.5rem">
             <Header title = "OVERVIEW" subtitle= "Overview of general revenue and profit."/>
             <Box mt="40px" height="75vh" >
                <FormControl sx={{mt : "1rem"}}>
                      <InputLabel>View</InputLabel>
                      <Select value={view} label="View" onChange={(e)=>setView(e.target.value)}>
                           <MenuItem value="sales">Sales
                           </MenuItem>
                            <MenuItem value="units">Units
                           </MenuItem>
                      </Select>
                </FormControl>
                <OverviewChart view={view}/>
      </Box>
      </Box>
}
