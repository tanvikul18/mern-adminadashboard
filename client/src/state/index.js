import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark",
    userId : '',
    userRole : '',
    isAuthenticated :false
}

export const globalSlice = createSlice({
    name : "global",
    initialState,
    reducers: {
        setMode : (state)=>{
           state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        checkAuthentication : (state,action)=>{
           state.isAuthenticated = action.payload;
             
        },
        setUserId : (state,action)=>{
             state.userId = action.payload;
        },
         setRole : (state,action)=>{
             state.userRole = action.payload;
        }
    }
})

export const {setMode,checkAuthentication,setUserId,setRole} = globalSlice.actions;

export default globalSlice.reducer;