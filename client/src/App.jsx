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
import Login from "./scenes/login/Login.jsx";
import ProtectedRoute from "./Protected.jsx";
function App() {
 const mode = useSelector((state)=>state.global.mode);
 const uRole = useSelector((state)=>state.global.userRole);
 console.log("u role from app",uRole)
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
             <Route path="/login"  element={<Login/>}/>
             {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/transactions" element={<Transaction />} />
                    <Route path="/geography" element={<Geography />} />
                    <Route path="/overview" element={<Overview />} />
                   

                    {/* Admin-only Routes */}
                    {uRole === "admin" && (
                      <>
                        <Route path="/customers" element={<Customer />} />
                        <Route path="/monthly" element={<Monthly />} />
                        <Route path="/admin" element={<Admin />} />
                      </>
                    )}
                      {/* User-only Routes */}
                    {uRole === "user" && (
                      <>
                         <Route path="/daily" element={<Daily />} />
                         <Route path="/breakdown" element={<Breakdown />} />
                      </>
                    )}
                  </Route>
                </Route>
                            {/* Redirect everything else */}
                <Route path="*" element={<Navigate to="/login" replace />} />
           </Routes>
       </ThemeProvider>
       </BrowserRouter>
    </div>
  )
}

export default App
