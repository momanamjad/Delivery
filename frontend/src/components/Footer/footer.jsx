import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets";
const footer = () => {
  return (
    <div className="footer " id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            aspernatur harum molestias ratione minima ullam necessitatibus
            maxime veniam sapiente atque.
          </p>
          <div className="footer-social-i">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Getting touch</h2>
            <ul>
                <li>+923281109353</li>
                <li>momanamjad07@gmail.com</li>
            </ul>
        </div>

      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 @ Tomato.com - All Rights Reserved</p>
    </div>
  );
};

export default footer;
