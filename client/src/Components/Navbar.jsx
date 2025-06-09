import React from 'react'
import {LightModeOutlined,DarkModeOutlined, Menu as MenuIcon,Search,SettingsOutlined,ArrowDropDownOutlined} from "@mui/icons-material"
import FlexBetwen from './FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from '../state'
import profileImage from "../assets/profile.jfif"
import { useState } from 'react'
import { AppBar, Button, IconButton,Menu, InputBase, Toolbar, useTheme,MenuItem,Box,Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
export default function Navbar(props) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl,setanchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (e)=>{
        setanchorEl(e.currentTarget)
    }
     const handleClose = (e)=>{
        setanchorEl(null);
        localStorage.removeItem("jwt");
        localStorage.removeItem("user")
        navigate("/login");

        
    }
  return <AppBar sx={{
      position : "static",
      background: "none",
      boxShadow : "none"
  }}>
    <Toolbar sx={{justifyContent : "space-between"}}>
        {/*LEFT SIDE*/ }
        <FlexBetwen>
            <IconButton onClick={()=>props.setSideBarOpen(! props.isSideBarOpen)}>
                <MenuIcon/>
            </IconButton>
            <FlexBetwen backgroundColor = {theme.palette.background.alt} borderRadius="9px" gap="3rem" p="0.1rem 0.3 rem">
              <InputBase placeholder='Search...'/>
                <IconButton>
                     <Search/>
                </IconButton>
              
            </FlexBetwen>

        </FlexBetwen>
         {/*LEFT SIDE*/ }
         <FlexBetwen gap="1.5rem">
            <IconButton onClick={()=>dispatch(setMode())}>
                {
                    theme.palette.mode === 'dark' ? ( 
                        <DarkModeOutlined sx={{fontSize : "25px"}}/>
                    ): ( <LightModeOutlined sx={{fontSize : "25px"}}/>)
                }
            </IconButton>
            <IconButton>
                 <SettingsOutlined sx={{fontSize : "25px"}}/>
            </IconButton>
             <FlexBetwen>
                 <Button onClick={handleClick} sx={{display:"flex",justifyContent: "space-between",alignItems:"center",textTransform : "none",gap:"1rem"}}>
                  <Box component="img" alt="profile" src={profileImage} height="32px" width="32px" borderRadius="50%" sx={{objectFit : "cover"}}/>
                      <Box textAlign="left">
                                          <Typography fontWeight="bold" fontSize="0.85rem" sx={{color:theme.palette.secondary[100]}}>
                                            {props.user.name}
                                          </Typography>
                                          <Typography fontWeight="bold" fontSize="0.75rem" sx={{color:theme.palette.secondary[200]}}>
                                            {props.user.occupation}
                                          </Typography>
                                         
                                </Box>   
                                 <ArrowDropDownOutlined sx={{color:theme.palette.secondary[300],fontSize :"0.75rem"}}/>
  
                 </Button>
                 <Menu anchorEl ={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical : "bottom",horizantal : "center"}}>
                         <MenuItem onClick={handleClose}>Log Out</MenuItem>
                    </Menu>
             </FlexBetwen>
         </FlexBetwen>
        </Toolbar>
  </AppBar>
}
