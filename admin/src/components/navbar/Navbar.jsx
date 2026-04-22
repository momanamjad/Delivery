import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = ({setToken}) => {
  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken("");
    window.location.replace("https://delivery-omega.vercel.app/");
  }

  return (
    <>
    <div className='navbar'>
        <img src={assets.logo} alt="logo" className='logo' />
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={assets.profile_icon} alt="user" className='profile' />
            <button onClick={logout} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#ff4c4c', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px' }}>Logout</button>
        </div>
    </div>
    </>
  )
}

export default Navbar