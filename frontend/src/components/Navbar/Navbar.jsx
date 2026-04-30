import React, { useContext, useState, useEffect } from "react";
import "./navbar.css";
import {Link, useNavigate, useLocation } from 'react-router-dom'
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
    const location = useLocation();

    useEffect(() => {
      if (location.pathname !== '/') {
        setmenu("");
        return;
      }

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
    }, [location.pathname]);

    const handleNavClick = (sectionId, menuName) => {
      setmenu(menuName);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else if (sectionId === "header") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (sectionId === "header") {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    const Logout=()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }

    const handleSearchClick = () => {
      setShowSearch(!showSearch);
      
      const scrollTarget = () => {
        const foodDisplay = document.getElementById('food-display');
        if (foodDisplay) {
          foodDisplay.scrollIntoView({ behavior: 'smooth' });
        }
      };

      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation and rendering
        setTimeout(scrollTarget, 100);
      } else {
        scrollTarget();
      }
    };

  return (
    <>
      <div className="navbar">
        <Link to='/' onClick={() => handleNavClick("header", "Home")}>   <img className="logo" src={assets.logo} alt="" /></Link>
        <ul className="navbar_menu">
          <li onClick={() => handleNavClick("header", "Home")} className={menu==="Home"?"active":""}>Home</li>
          <li onClick={() => handleNavClick("explore-menu", "Menu")} className={menu==="Menu"?"active":""}>Menu</li>
          <li onClick={() => handleNavClick("app-download", "mobile-app")} className={menu=== "mobile-app"?"active":""}>Mobile App</li>
          <li onClick={() => handleNavClick("footer", "Contact")} className={menu==="Contact"?"active":""}>Contact Us</li>
        </ul>
        <div className="navbar_right">
          <div className="navbar-search" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            {showSearch && <input className="navbar-search-input" type="text" placeholder="Search dishes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{padding: '5px 10px', borderRadius: '20px', border: '1px solid tomato', outline: 'none'}} />}
            <img onClick={handleSearchClick} src={assets.search_icon} alt="" style={{cursor: 'pointer'}} />
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
