import React from "react";
import "./header.css";
import {Link } from 'react-router-dom'

const header = () => {
  return (
    <div className="header">
      <div className="headerContents">
        <h2>Order your Food here</h2>
        <p>
          Chose from diverse menu featuring a delectable array of dishes crafted
          with finest in gredients and culinary enterprise our mission is to
          satisfy your cravings.
        </p>
        <Link to='/Menu'> <button>View Menu</button> </Link>
        {/* <button>View Menu</button> */}
        {/* <Link ><button>View Menu</button></Link> */}
      </div>
    </div>
  );
};

export default header;
