import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/home'
import Cart from './pages/Cart/cart'
import PlaceOrder from "./pages/Place_Order/place_order";
import Footer from "./components/Footer/footer";
import LoginPopup from "./components/Login_popup/Login_popup";
import Verify from "./pages/verify/Verify.jsx";
import MyOrders from "./pages/My_Orders/MyOrders.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="app-container">
      <ToastContainer />
      {showLogin ? <LoginPopup setshowlogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setshowlogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
