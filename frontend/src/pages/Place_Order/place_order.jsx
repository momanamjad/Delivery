import React, { useContext } from "react";
import "./place_order.css";
import { StoreContext } from "../../context/Storecontext";
const place_order = () => {
  const {getTotalcartamount}=useContext(StoreContext);
  return (
    <form action="" className="place-order">
      <div className="place-order-left">
        <p className="title"> Delivery Information</p>
        <div className="multi-feilds">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multi-feilds">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State " />
        </div>
        <div className="multi-feilds">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
         <div className="cart-total">
            <h2>Cart total</h2>
            <div>
                     <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalcartamount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalcartamount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalcartamount()===0?0:getTotalcartamount()+2}</b>
              </div>
            </div>
            <button >PROCEED TO Payment</button>
          </div>

      </div>
    </form>
  );
};

export default place_order;
