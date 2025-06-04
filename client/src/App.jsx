import Dashboard from "./scenes/dashboard/Dashboard.jsx";
import Layout from "./scenes/layout/Layout.jsx";
import { CssBaseline,ThemeProvider } from "@mui/material"
import {createTheme} from "@mui/material/styles"
import { useMemo } from "react";
import { useSelector } from "react-redux"
import { BrowserRouter, Navigate, replace,Routes,Route } from "react-router-dom";
import { themeSettings } from "./theme.js"
import Product from "./scenes/product/Product.jsx";
import Customer from "./scenes/customer/Customer.jsx";
import Transaction from "./scenes/transactions/Transaction.jsx"
import Geography from "./scenes/geography/Geography.jsx";
import Overview from "./scenes/overall/Overview.jsx";
import Daily from "./scenes/daily/Daily.jsx";
import Monthly from "./scenes/monthly/Monthly.jsx";
import Breakdown from "./scenes/breakdown/Breakdown.jsx"
import Admin from "./scenes/admin/Admin.jsx";
import Performance from "./scenes/performance/Performance.jsx";
function App() {
 const mode = useSelector((state)=>state.global.mode);
 
 const theme =useMemo(()=>{
   return createTheme(themeSettings(mode),[mode])
 });
 console.log(theme)
  return (
    <div className="App">
      <BrowserRouter>
       <ThemeProvider theme={theme}>
           <CssBaseline/>
           <Routes>
             <Route element={<Layout/>}>
                <Route path= "/" element={<Navigate to="/dashboard" replace/>}/>
                  <Route path= "/dashboard" element={<Dashboard/>}/>
                   <Route path= "/products" element={<Product/>}/>
                   <Route path= "/customers" element={<Customer/>}/>
                   <Route path= "/transactions" element={<Transaction/>}/>
                   <Route path= "/geography" element={<Geography/>}/>
                    <Route path= "/overview" element={<Overview/>}/>
                    <Route path= "/daily" element={<Daily/>}/>
                    <Route path= "/monthly" element={<Monthly/>}/>
                    <Route path= "/breakdown" element={<Breakdown/>}/>
                      <Route path= "/admin" element={<Admin/>}/>
                       <Route path= "/performance" element={<Performance/>}/>
             </Route>
           </Routes>
       </ThemeProvider>
       </BrowserRouter>
    </div>
  )
}

export default App
