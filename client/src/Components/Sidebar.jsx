import React from 'react'
import { useState } from 'react'
import {Box,Divider,Drawer,IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Typography,useTheme} from "@mui/material"
import{SettingsOutlined,ChevronLeft,ChevronRight,HomeOutlined,ShoppingCartOutlined,Groups2Outlined,ReceiptLongOutlined,PublicOutlined,PointOfSaleOutlined,
    TodayOutlined,CalendarMonthOutlined,AdminPanelSettingsOutlined,TrendingUpOutlined,PieChartOutlined,
    ChevronRightOutlined} from "@mui/icons-material"
import { useLocation, useNavigate } from 'react-router-dom'
import { usseState } from 'react';
import { useEffect } from 'react';
import FlexBetween from './FlexBetween';
import profileImage from "../assets/profile.jfif"
import { useSelector } from 'react-redux'
const navItems = [
    {
        text:  "Dashboard",
        icon: <HomeOutlined/>,
       
    }, 
    {
        text:  "Client Facing",
        icon: null
    },
    {
        text:  "Products",
        icon: <ShoppingCartOutlined/>,
        
    },
      {
        text:  "Customers",
        icon: <Groups2Outlined/>,
         roles: ["admin"]
    },
      {
        text:  "Transactions",
        icon: <ReceiptLongOutlined/>
    },
    {
        text:  "Geography",
        icon: <PublicOutlined/>
    },
    {
        text:  "Sales",
        icon: null
    },
      {
        text:  "Overview",
        icon: <PointOfSaleOutlined/>
    },
      {
        text:  "Daily",
        icon: <TodayOutlined/>,
         roles: ["user"]
    },
      {
        text:  "Monthly",
        icon: <CalendarMonthOutlined/>
    },
      {
        text:  "Breakdown",
        icon: <PieChartOutlined/>,
         roles: ["user"]
    },
      {
        text:  "Managament",
        icon: null
    },
      {
        text:  "Admin",
        icon: <AdminPanelSettingsOutlined/>,
         roles: ["admin"]
    },
     
]
export default function Sidebar({isNoMobile,drawerWidth,isSideBarOpen,setSideBarOpen,user}) {
    const {pathname} = useLocation();
    const[active,setActive] = useState('');
    const uRole = useSelector((state)=>state.global.userRole);
    console.log("userrole",uRole)
    const navigate= useNavigate();
    const theme= useTheme();

    useEffect(()=>{
        setActive(pathname.substring(1))
    },[pathname])
  return <Box component="nav">
      {
        isSideBarOpen && 
        <Drawer open={isSideBarOpen} onClose={()=> setSideBarOpen(false)} variant='persistent' anchor='left'
        sx={{width:drawerWidth,
            "& .MuiDrawer-paper":{
                color : theme.palette.secondary[200],
                backgroundColor : theme.palette.background.alt,
                boxSizing:"border-box",
                borderWidth: isNoMobile ? 0 :"20px",
                width:drawerWidth
            }
        }}>
              <Box width="100%">
                      <Box m="1.5rem 2rem 2rem 3rem">
                             <FlexBetween color={theme.palette.secondary.main}>
                                 <Box display={"flex"} alignItems={"center"} gap={"0.5rem"}>
                                     <Typography variant='h4' fontWeight={"bold"}>
                                        Admin Dash
                                     </Typography>
                                 </Box>
                                 {!isNoMobile && (
                                    <IconButton onClick={()=>setSideBarOpen(!isSideBarOpen)}>
                                         <ChevronLeft/>
                                    </IconButton>
                                 )}
                             </FlexBetween>
                      </Box>
                      <List>
                        {
                              navItems.length > 0 && navItems.map(({text,icon,roles})=>
                               {
                                 if (roles && !roles.includes(uRole)) return null;
                                       if(!icon){
                                         return (
                                            <Typography key={text} sx={{m:"2.25rem 0 1rem 3rem"}}>
                                                {
                                                      text
                                                }
                                            </Typography>
                                         )
                                       }
                                         const lcTxt = text.toLowerCase();
                                         return(
                                            <ListItem key={text} disablePadding>
                                                    <ListItemButton onClick={()=>{
                                                        navigate(`/${lcTxt}`);
                                                        setActive(lcTxt);   
                                                        }} sx={{backgroundColor: active == lcTxt ? theme.palette.secondary[300] :
                                                           "transparent",
                                                           color: active == lcTxt ? theme.palette.primary[600] :
                                                            theme.palette.secondary[200]}}>
                                                        <ListItemIcon sx={{
                                                            ml : "2rem",
                                                            color: active == lcTxt ? theme.palette.primary[600] :
                                                            theme.palette.secondary[200]
                                                        }}>
                                                            {icon}
                                                        </ListItemIcon>
                                                        <ListItemText primary={text}></ListItemText>
                                                        {
                                                            active === lcTxt && (
                                                                <ChevronRightOutlined sx={{ml :"auto"}}></ChevronRightOutlined>
                                                             ) 
                                                        }
                                                    </ListItemButton>
                                            </ListItem>
                                         )
                                       

                               }
                            )
                        }
                      </List>
              </Box>
              <Box position="absolute" bottom="2rem">
                   <Divider/>
                   <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                           <Box component="img" alt="profile" src={profileImage} height="40px" width="40px" borderRadius="50%" sx={{objectFit : "cover"}}/>
                                <Box textAlign="left">
                                          <Typography fontWeight="bold" fontSize="0.9rem" sx={{color:theme.palette.secondary[100]}}>
                                            {user.name}
                                          </Typography>
                                          <Typography fontWeight="bold" fontSize="0.8rem" sx={{color:theme.palette.secondary[200]}}>
                                            {user.occupation}
                                          </Typography>
                                </Box>
                                 <SettingsOutlined sx={{color : theme.palette.secondary[300],fontSize:"25px"}}>

                                 </SettingsOutlined>
                           
                   </FlexBetween>
              </Box> 
        </Drawer>
       
       
      }
    </Box>
}
