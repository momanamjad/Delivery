import React, {  useContext, useState } from "react";
import "./Login-popup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/Storecontext";
import axios from "axios";  
const Login_popup = ({setshowlogin}) => {
  const [currentstate, setcurrentstate] = useState("login");
  const {url,setToken}=useContext(StoreContext);
  const[data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}))
  }
 const onLogin=async(e)=>{
  e.preventDefault();
  let newUrl=url;
  if(currentstate==="login"){
    newUrl+="/api/user/login"
  }else{  
    newUrl+="/api/user/register"
  }
  try {
     const response=await axios.post(newUrl,data)
     if(response.status===200 && response.data.success){
       
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setshowlogin(false);

        if (data.email.toLowerCase() === "admin@delivery.com" || response.data.message.includes("Admin Login")) {
           const adminUrl = import.meta.env.VITE_ADMIN_URL || "http://localhost:5173";
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
          <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentstate==="login"?<></>:     <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name"required />}
          {/* <input type="text" placeholder="Your name"required /> */}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email"required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Apply password" required/>

        </div>
        <button type='submit'>{currentstate==="sign up"?"create account":"login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox"required />
          <p>By continuing , i agree to the terms of use & policy</p>
        </div>
        {currentstate==='login'?   <p>Create a new account? <span onClick={()=>setcurrentstate("sign up")}>Click here</span></p>
       : <p>Already have an account? <span onClick={()=>setcurrentstate("login")}>Login here</span></p>
               }
        <p>Admin Login? <span onClick={() => window.location.href = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174"}>Click here</span></p>
        </form>
    </div>
  );
};

export default Login_popup;
