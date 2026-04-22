import React, { useContext, useState } from "react";
import "./cart.css";
import { StoreContext } from "../../context/Storecontext";
import { useNavigate } from "react-router-dom";
const cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalcartamount,url,token } = useContext(StoreContext);
  const navigate=useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const handleCheckout = () => {
    if (!token) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else {
      if(getTotalcartamount() === 0){
          alert("Your cart is empty!");
      } else {
          navigate('/order');
      }
    }
  };
  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div>
                  <div className="cart-items-title cart-items-item">
                    {/* <p>{item.name}</p> */}
                    <img src={item.image.startsWith("http") ? item.image : url+"/images/"+item.image} onError={(e)=>{e.target.src="https://placehold.co/400x300/ff6347/white?text=Food+Image"}} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{item.price * cartItems[item._id]}$</p>
                    <p
                      onClick={() => removeFromCart(item._id)}
                      className="cross"
                    >
                      X
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
        <div className="cart-bottom">
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
            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promocode add it here</p>
              <div className="cart-promocode-input">
                <input type="text" name="" id="" placeholder="promocode" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showNotification && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'tomato', color: 'white', padding: '15px 30px', borderRadius: '8px', zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontWeight: 'bold', animation: 'fadeIn 0.5s' }}>
          Please login first to proceed to checkout!
        </div>
      )}
    </>
  );
};

export default cart;
