import React, { useEffect, useState, useContext } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/Storecontext";
import axios from "axios";
import { assets } from "../../assets/assets";
import { Package, Truck, CheckCircle, Clock, ChevronRight } from "lucide-react";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        url + "/api/order/userOrders",
        {},
        { headers: { token } },
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const getStatusStep = (status) => {
    switch (status) {
      case "Food Processing": return 1;
      case "Out For Delivery": return 2;
      case "Delivered": return 3;
      default: return 1;
    }
  };

  return (
    <div className="my-orders-page">
      <div className="my-orders-header">
        <h1>Track Your Orders</h1>
        <p>Stay updated with your food delivery in real-time</p>
      </div>

      <div className="orders-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching your orders...</p>
          </div>
        ) : data.length > 0 ? (
          data.map((order, index) => {
            const currentStep = getStatusStep(order.status);
            return (
              <div key={index} className="order-tracker-card">
                <div className="order-info-top">
                  <div className="order-main">
                    <img src={assets.parcel_icon} alt="Package" className="parcel-img" />
                    <div className="order-details">
                      <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                      <p className="item-summary">
                        {order.items.map((item, idx) => (
                          <span key={idx}>
                            {item.name} x {item.quantity}{idx < order.items.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="order-price">
                    <span className="total-label">Total Amount</span>
                    <span className="amount">${order.amount}.00</span>
                  </div>
                </div>

                <div className="tracker-timeline">
                  <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
                    <div className="icon-wrapper">
                      <Clock size={20} />
                    </div>
                    <span>Processing</span>
                  </div>
                  <div className={`line ${currentStep >= 2 ? "active" : ""}`}></div>
                  <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
                    <div className="icon-wrapper">
                      <Truck size={20} />
                    </div>
                    <span>On the Way</span>
                  </div>
                  <div className={`line ${currentStep >= 3 ? "active" : ""}`}></div>
                  <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
                    <div className="icon-wrapper">
                      <CheckCircle size={20} />
                    </div>
                    <span>Delivered</span>
                  </div>
                </div>

                <div className="order-footer">
                  <div className="status-badge">
                    <span className="dot"></span> {order.status}
                  </div>
                  <button className="refresh-btn" onClick={fetchOrders}>
                    Update Status <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-orders-state">
            <Package size={48} />
            <h2>No Orders Yet</h2>
            <p>Looks like you haven't ordered any delicious food yet!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
