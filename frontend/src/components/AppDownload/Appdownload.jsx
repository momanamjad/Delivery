import React, { useState } from 'react'
import './Appdownload.css'
import { assets } from '../../assets/assets'

const Appdownload = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleClick = () => {
    setIsShaking(true);
    setShowNotification(true);
    
    setTimeout(() => {
      setIsShaking(false);
    }, 500);

    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className={`app-download ${isShaking ? 'shake' : ''}`} id='app-download' style={{ position: 'relative' }}>
        <p>For a better experience, download the <br /> Tomato App</p>
        <div className="app-download-platform">
            <img onClick={handleClick} src={assets.play_store} alt="Play Store" />
            <img onClick={handleClick} src={assets.app_store} alt="App Store" />
        </div>
        
        {showNotification && (
          <div className="app-download-notification">
            Mobile app is currently in progress!
          </div>
        )}
    </div>
  )
}

export default Appdownload