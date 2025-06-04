  import React, { use, useState } from 'react'
import {Box,Card,CardActions,CardContent, Collapse,Button,Typography,Rating,useTheme,useMediaQuery, collapseClasses, Toolbar} from "@mui/material"
import { useGetTransactionsQuery } from '../../state/api.js'
import Header from "../../Components/Header.jsx"
import {DataGrid} from "@mui/x-data-grid"
import DataGridCustomToolbar from "../../Components/DataGridCustomToolbar.jsx"
export default function Transaction() {
    const theme= useTheme();
    //values to be sent to backend
    const[page,setPage] = useState(0);
   const[pageSize,setPageSize] = useState(20);
   const[sort,setSort] = useState({});
   const[search,setSearch] = useState('');
    const[searchInput,setSearchInput] = useState('');
   //end
    const {data,isLoading} = useGetTransactionsQuery({
      page,
      pageSize,
      sort:JSON.stringify(sort),
      search
    });
   console.log("Transaction data",data)
    const isNoMobile = useMediaQuery("(min-width:1000px)");
   const columns=[
    {
      field : "_id",
      headerName : "ID",
      flex : 1
    },
     {
      field : "userId",
      headerName : "User ID",
      flex : 1
    },
     {
      field : "createdAt",
      headerName : "CreatedAt",
      flex : 1
    },
     {
      field : "products",
      headerName : "# of products",
      flex : 0.5,
     sortable : false,
     renderCell : (params) => params.value.length
    },
      {
      field : "cost",
      headerName : "Cost",
      flex : 1,
      renderCell : (params) => `$${Number(params.value).toFixed(2)}`
    }
   ]
  return <Box m="1.5rem 2.5rem">
            <Header title = "TRANSACTIONS" subtitle= "Entire list of transactions"/>
            <Box mt="40px" height="80vh">
               <DataGrid loading = {isLoading || !data} getRowId={(row)=>row._id} rows = {data?.transactions || []} columns={columns} rowCount={data && data?.total || 0}  pagination page={page} pageSize={pageSize} paginationMode='server' sortingMode='server' 
              onPageChange = {(newPage)=>setPage(newPage)}
              rowsPerPageOptions={[20,50,100]}
               onPageSizeChange = {(newPageSize)=>setPageSize(newPageSize)} 
                onSortModelChange = {(newsortModel)=>setSort(...newsortModel)} 
                slots = {{toolbar : DataGridCustomToolbar}}
                slotProps = {{
                 toolbar : {
                  searchInput,
                  setSearchInput,
                 setSearch,}
                }}
               >
                                
                            </DataGrid>
            </Box>
  </Box>
}
