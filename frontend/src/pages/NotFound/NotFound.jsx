import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-graphic">
          <span className="nf-emoji">🍽️</span>
          <h1 className="nf-code">404</h1>
        </div>
        <h2 className="nf-title">Oops! Page Not Found</h2>
        <p className="nf-desc">
          Looks like this page went out for delivery and never came back.
        </p>
        <Link to="/" className="nf-btn">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
