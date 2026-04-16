import React, { useContext, useState } from "react";
import axios from "axios";
import "./place_order.css";
import { StoreContext } from "../../context/Storecontext";
const PlaceOrder = () => {
  const { getTotalcartamount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  // Helper to decode JWT and extract userId
  function getUserIdFromToken(token) {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload.userId || payload._id || null;
    } catch (e) {
      return null;
    }
  }
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo.quantity = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let userId = getUserIdFromToken(token);
    let orderData = {
      userId,
      address: data,
      items: orderItems,
      amount: getTotalcartamount() === 0 ? 0 : getTotalcartamount() + 2,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
  const {session_url} = response.data;
  window.location.replace(session_url);
    }
    else{
      alert("Order placement failed. Please try again.");
    }
  };
  
  return (
    <form action="" onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title"> Delivery Information</p>
        <div className="multi-feilds">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-feilds">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State "
          />
        </div>
        <div className="multi-feilds">
          <input
            required
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
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
              <p>${getTotalcartamount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalcartamount() === 0 ? 0 : getTotalcartamount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
