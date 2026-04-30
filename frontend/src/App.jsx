import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import  Home from './pages/Home/home'
import Cart from './pages/Cart/cart'
import Place_order from "./pages/Place_Order/place_order";
import Footer from "./components/Footer/footer";
import Login_popup from "./components/Login_popup/Login_popup";
import Verify from "./pages/verify/Verify.jsx";
import MyOrders from "./pages/My_Orders/MyOrders.jsx";
const App = () => {
  const[showlogin,setshowlogin]=useState(false)
  return (
    <div className="app-container">
      {showlogin?< Login_popup setshowlogin={setshowlogin}/>:<></> }
      <div className="app">
        <Navbar setshowlogin={setshowlogin} />
        <Routes>
          <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart/>}/>

            <Route path='/order'element={<Place_order/>}/>
            <Route path='/verify'element={<Verify/>}/>
            <Route path='/myorders'element={<MyOrders/>}/>
            
        </Routes>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
