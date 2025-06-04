 import React, { use, useState } from 'react'
import {Box,Card,CardActions,CardContent, Collapse,Button,Typography,Rating,useTheme,useMediaQuery, collapseClasses} from "@mui/material"
import { useGetAdminQuery } from '../../state/api.js'
import Header from "../../Components/Header.jsx"
import {DataGrid} from "@mui/x-data-grid"


export default function Admin() {
    const theme= useTheme();
    const {data,isLoading} = useGetAdminQuery();
  
    const isNoMobile = useMediaQuery("(min-width:1000px)");
   const columns=[
    {
      field : "_id",
      headerName : "ID",
      flex : 1
    },
     {
      field : "name",
      headerName : "Name",
      flex : 0.5
    },
     {
      field : "email",
      headerName : "Email",
      flex : 1
    },
     {
      field : "phoneNumber",
      headerName : "Phone Number",
      flex : 0.5,
      renderCell : (params)=>{
           return params.value.replace(/^(\d{3})(\d{3})(\d{4})/ ,"($1)$2-$3")
      }
    },
      {
      field : "country",
      headerName : "Country",
      flex : 0.4
    },
      {
      field : "occupation",
      headerName : "Occupation",
      flex : 1
    },
      {
      field : "role",
      headerName : "Role",
      flex : 0.5
    }
   ]
  return <Box m="1.5rem 2.5rem">
            <Header title = "ADMINS" subtitle= "Managing admins and list of admins."/>
            <Box mt="40px" height="75vh">
              <DataGrid loading = {isLoading || !data} getRowId={(row)=>row._id} rows = {data || []} columns={columns}>
                
              </DataGrid>
            </Box>
  </Box>
}
