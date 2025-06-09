import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetLoggedInUserMutation } from "../../state/api.js";
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button
} from "@mui/material"
import { useDispatch } from 'react-redux';
import { checkAuthentication, setUserId ,setRole} from '../../state/index.js';
function Login() {
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();
const [login, {isLoading, error }] = useGetLoggedInUserMutation();
const dispatch = useDispatch();
  const handleLogin=async(e)=>{
    e.preventDefault();
   try{
     // console.log(name,password)
      const data  = await login({ name, password }).unwrap();
      const {token,user}  = data;
      dispatch(checkAuthentication(true))
      dispatch(setUserId(user._id))
       dispatch(setRole(user.role))
   //   console.log('Logged in:', user);
      localStorage.setItem("jwt",token);
      localStorage.setItem("user",JSON.stringify(user));
      navigate("/dashboard")
   }
  
   

   catch(err){
     console.log(err)
   }

    console.log("Loggedin")
      navigate("/dashboard")
  }
  return (
    <div className='login-container'>
      <Paper>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12} style={{"margin":"20px"}}>
            <TextField label="Username" value={name} onChange={(e)=>setName(e.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} value={password} onChange={(e)=>{setPassword(e.target.value)}}></TextField>
          </Grid>
         
          <Grid item xs={12}>
            <Button fullWidth onClick={handleLogin} style={{color : "#000",backgroundColor:"#fff",margin:"10px"}}> Login </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
  
}

export default Login
