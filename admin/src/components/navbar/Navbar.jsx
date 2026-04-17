import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <>
    <div className='navbar'>
        <img src={assets.logo} alt="logo" className='logo' />
        <img src={assets.profile_icon} alt="user" className='profile' />
    </div>
    </>
  )
}

export default Navbar