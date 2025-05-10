import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import AuthLayout from "@/components/auth/layout.jsx";
import AuthLogin from "@/pages/auth/login.jsx";
import AuthRegister from "@/pages/auth/register.jsx";
import AdminLayout from "@/components/admin-view/layout.jsx";
import AdminDashboard from "@/pages/admin-view/dashboard.jsx";
import AdminOrders from "@/pages/admin-view/orders.jsx";
import AdminProducts from "@/pages/admin-view/products.jsx";
import ShoppingLayout from "@/components/shopping-view/layout.jsx";
import NotFound from "@/pages/not-found/notFound.jsx";
import ShoppingHome from "@/pages/shopping-view/home.jsx";
import ShoppingListing from "@/pages/shopping-view/listing.jsx";
import ShoppingAccount from "@/pages/shopping-view/account.jsx";
import ShoppingCheckout from "@/pages/shopping-view/checkout.jsx";
import CheckAuth from "@/components/common/check-auth.jsx";
import UnauthPage from "@/pages/unauth-page/unauth.jsx";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "@/store/auth-slice/authSlice.js";
import { Skeleton } from "@/components/ui/skeleton"


function App() {
  const {isAuthenticated, isLoading, user}=useSelector(state=>state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if(isLoading){
    return <Skeleton className="w-[800px] bg-black h-[600px]" />

  }
  return (

    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/*Auth Routes*/}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
          }>
          <Route path="login" element={<AuthLogin/>}/>
          <Route path="register" element={<AuthRegister/>}/>
        </Route>

        {/*Admin Routes*/}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout/>
          </CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="products" element={<AdminProducts/>}/>
          <Route path="orders" element={<AdminOrders/>}/>
        </Route>

        {/*Shopping Routes*/}
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>}>
          <Route path="home" element={<ShoppingHome/>}/>
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<ShoppingAccount/>}/>
          <Route path="checkout" element={<ShoppingCheckout/>}/>
        </Route>

        {/*Page Not Found */}
       <Route path="*" element={<NotFound/>}/>

        {/*Un-Auth Page*/}
        <Route path="/unauth-page" element={<UnauthPage/>}/>



      </Routes>
    </div>

  )
}

export default App
