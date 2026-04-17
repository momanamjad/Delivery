import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';

const Login = ({ url, setToken }) => {
  const [data, setData] = useState({ email: '', password: '' });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url + '/api/user/admin', data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('adminToken', response.data.token);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className='admin-login'>
      <div className="admin-login-container">
        <h1>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="admin-login-inputs">
            <input 
              name='email' 
              onChange={onChangeHandler} 
              value={data.email} 
              type="email" 
              placeholder='Admin Email' 
              required 
            />
            <input 
              name='password' 
              onChange={onChangeHandler} 
              value={data.password} 
              type="password" 
              placeholder='Password' 
              required 
            />
          </div>
          <button type='submit'>Login</button>
        </form>
        <p className='admin-login-note'>
          <strong>Demo Access:</strong> <br/> Email: <code>admin@delivery.com</code> <br/> Password: <code>admin123</code>
        </p>
      </div>
    </div>
  );
};

export default Login;
