import React, { useContext, useState, useEffect } from "react";
import "./navbar.css";
import {Link, useNavigate } from 'react-router-dom'
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/Storecontext";
import profile_icon from "../../assets/profile_icon.png"
import bag_icon from "../../assets/bag_icon.png"
import logout_icon from "../../assets/logout_icon.png"

const Navbar = ({setshowlogin}) => {
     
    const [menu ,setmenu]=useState("Home");
    const [showSearch, setShowSearch] = useState(false);
    const {getTotalcartamount,token,setToken, searchQuery, setSearchQuery}=useContext(StoreContext);
    const navigate=useNavigate();

    useEffect(() => {
      const sections = ["header", "explore-menu", "app-download", "footer"];
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId === "header") setmenu("Home");
            else if (sectionId === "explore-menu") setmenu("Menu");
            else if (sectionId === "app-download") setmenu("mobile-app");
            else if (sectionId === "footer") setmenu("Contact");
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);
      
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });

      return () => observer.disconnect();
    }, []);

    const Logout=()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }
  return (
    <>
      <div className="navbar">
        <Link to='/'>   <img className="logo" src={assets.logo} alt="" /></Link>
        <ul className="navbar_menu">
          <Link  to='/' onClick={()=>setmenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
          <a href="#explore-menu" onClick={()=>setmenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
          <a href="#app-download" onClick={()=>setmenu("mobile-app")} className={menu=== "mobile-app"?"active":""}>Mobile App</a>
          <a href="#footer" onClick={()=>setmenu("Contact")} className={menu==="Contact"?"active":""}>Contact Us</a>
        </ul>
        <div className="navbar_right">
          <div className="navbar-search" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            {showSearch && <input type="text" placeholder="Search dishes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{padding: '5px 10px', borderRadius: '20px', border: '1px solid tomato', outline: 'none', width: '150px'}} />}
            <img onClick={() => {
                setShowSearch(!showSearch);
                const foodDisplay = document.getElementById('food-display');
                if (foodDisplay) {
                    foodDisplay.scrollIntoView({ behavior: 'smooth' });
                }
            }} src={assets.search_icon} alt="" style={{cursor: 'pointer'}} />
          </div>
          <div className="navbar_search_icon">
          <Link to='/cart'> <img src={assets.basket_icon} alt="" /></Link>   
            <div className={getTotalcartamount()===0?"":"dot"}></div>
          </div>
          {!token? <button onClick={()=>setshowlogin(true)}>Sign In</button>:
          <div className="navbar-profile"><img src={profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myOrders')}> <img  src={bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            <li onClick={Logout}> <img src={logout_icon} alt="" /><p>Logout</p></li>
          </ul>
          </div>}         
        </div>
      </div>
    </>
  );
};

export default Navbar;
