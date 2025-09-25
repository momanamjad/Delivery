import React, { useState } from "react";
import "./Login-popup.css";
import { assets } from "../../assets/assets";
const Login_popup = ({setshowlogin}) => {
  const [currentstate, setcurrentstate] = useState("login");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentstate}</h2>
          <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentstate==="login"?<></>:     <input type="text" placeholder="Your name"required />}
          <input type="text" placeholder="Your name"required />
          <input type="email" placeholder="Your email"required />
          <input type="password" name="" id=""placeholder="Apply password" required/>

        </div>
        <button>{currentstate==="sign up"?"create account":"login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox"required />
          <p>By continuing , i agree to the terms of use & policy</p>
        </div>
        {currentstate==='login'?   <p>Create a new account? <span onClick={()=>setcurrentstate("sign up")}>Click here</span></p>
       : <p>Already have an account? <span onClick={()=>setcurrentstate("login")}>Login here</span></p>
               }
       
        </form>
    </div>
  );
};

export default Login_popup;
