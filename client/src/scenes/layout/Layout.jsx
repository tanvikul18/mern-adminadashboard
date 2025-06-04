import React from 'react'
import { useState } from 'react'
import {Box,useMediaQuery} from "@mui/material";
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Navbar.jsx';
import Sidebar from '../../Components/Sidebar.jsx';
import { useGetUserQuery } from '../../state/api.js';

export default function Layout() {
    const isNoMobile = useMediaQuery("(min-width : 600px)");
    const [isSideBarOpen,setSideBarOpen] = useState(true);
     const userId = useSelector((state)=>state.global.userId);
     console.log("uuserId",userId)
    const {data} = useGetUserQuery(userId);
    console.log("data",data)
  return <Box display={isNoMobile ? "flex" : "block"} width="100%" height="100%">
     <Sidebar isNoMobile= {isNoMobile} drawerWidth="320px" isSideBarOpen = {isSideBarOpen} setSideBarOpen={setSideBarOpen} user={data || {}}/>
          <Box flexGrow={1}>
              <Navbar isSideBarOpen = {isSideBarOpen} setSideBarOpen={setSideBarOpen} user={data || {}}/>
              <Outlet/>

          </Box>
  </Box>
}
