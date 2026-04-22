import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets";
const footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Tomato Logo" />
          <p>
            Bringing your favorite flavors straight to your doorstep. Our mission
            is to provide high-quality, fresh meals with the convenience of
            modern delivery technology. Experience the best of local cuisine
            at the touch of a button.
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li><a href="#header">Home</a></li>
            <li><a href="#explore-menu">About us</a></li>
            <li><a href="#app-download">Delivery</a></li>
            <li><a href="#footer">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li><a href="tel:+923281109353">+92 328 1109353</a></li>
            <li><a href="mailto:contact@tomato.com">contact@tomato.com</a></li>
            <li>Lahore, Pakistan</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2026 © Tomato.com - All Rights Reserved.</p>
    </div>
  );
};

export default footer;
