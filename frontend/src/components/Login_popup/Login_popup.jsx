import React, { useContext, useState } from "react";
import "./Login-popup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/Storecontext";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Login_popup = ({ setshowlogin }) => {
  const [currentstate, setcurrentstate] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${url}/api/user/google-login`, {
        idToken: credentialResponse.credential
      });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setshowlogin(false);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      alert(error.response?.data?.message || error.message || "Google Login failed");
    }
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }))
  }
  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currentstate === "login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }
    try {
      const response = await axios.post(newUrl, data)
      if (response.status === 200 && response.data.success) {

        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setshowlogin(false);

        if (data.email.toLowerCase() === "admin@delivery.com" || response.data.message.includes("Admin Login")) {
          const adminUrl = import.meta.env.VITE_ADMIN_URL || "https://delivery-admin-ten.vercel.app/";
          window.location.href = adminUrl;
        }
      }
    } catch (error) {
      alert(error.response.data.message)
    }

  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentstate}</h2>
          <img onClick={() => setshowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentstate === "login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />}
          {/* <input type="text" placeholder="Your name"required /> */}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
          <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center' }}>
            <input name='password' onChange={onChangeHandler} value={data.password} type={showPassword ? "text" : "password"} placeholder="Apply password" required style={{ width: '100%', paddingRight: '40px', outline: 'none', border: '1px solid var(--input-border)', padding: '10px', borderRadius: '4px', backgroundColor: 'transparent', color: 'var(--text-color)' }} />
            <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '15px', cursor: 'pointer', userSelect: 'none' }}>
              {showPassword ? "👁️‍🗨️" : "👁️‍🗨️"}
            </span>
          </div>

        </div>
        <button type='submit'>{currentstate === "sign up" ? "create account" : "login"}</button>
        
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log('Login Failed');
              alert("Google Login Failed");
            }}
            theme="filled_blue"
            shape="pill"
          />
        </div>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing , i agree to the terms of use & policy</p>
        </div>
        {currentstate === 'login' ? <p>Create a new account? <span onClick={() => setcurrentstate("sign up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setcurrentstate("login")}>Login here</span></p>
        }
        {currentstate === 'login' && <p>Are you an admin? <span onClick={() => window.location.href = import.meta.env.VITE_ADMIN_URL || "https://delivery-admin-ten.vercel.app/"}>Admin Login</span></p>}
      </form>
    </div>
  );
};

export default Login_popup;
