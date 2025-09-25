import React, { useContext, useState } from "react";
import "./navbar.css";
import {Link } from 'react-router-dom'
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/Storecontext";
// import   
const navbar = ({setshowlogin}) => {
    // const Navbar=((setshowlogin)=>{

    // })
    const [menu ,setmenu]=useState("menu");
    const {getTotalcartamount}=useContext(StoreContext);
  return (
    <>
      <div className="navbar">
        <Link to='/'>   <img className="logo" src={assets.logo} alt="" /></Link>
        {/* <img className="logo" src={assets.logo} alt="" /> */}
        <ul className="navbar_menu">
          <Link  to='/' onClick={()=>setmenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
          <a href="#explore-menu" onClick={()=>setmenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
          <a href="#app-download" onClick={()=>setmenu("mobile-app")} className={menu=== "mobile-app"?"active":""}>mobile-app</a>
          <a href="#footer" onClick={()=>setmenu("Contact")} className={menu==="Contact"?"active":""}>Contact</a>
        </ul>
        <div className="navbar_right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar_search_icon">
         <Link to='/cart'> <img src={assets.basket_icon} alt="" /></Link>   
            <div className={getTotalcartamount()===0?"":"dot"}></div>
          </div>
          <button onClick={()=>setshowlogin(true)}>SignIn</button>
        </div>
      </div>
    </>
  );
};

export default navbar;
