import React, { useState, useEffect } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";
import { Search, Filter, ChevronLeft, ChevronRight, Package, User, MapPin, Phone, CreditCard, X } from "lucide-react";
import Skeleton from "../../components/skeleton/Skeleton";

const Orders = ({ url, token }) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(6);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const fetchAllOrders = async (currentPage = page) => {
    setLoading(true);
    try {
      // In a real app, filtering by status would happen on the backend.
      // For now, we'll fetch and filter on frontend for simplicity if the backend doesn't support it.
      const response = await axios.get(`${url}/api/order/list?page=${currentPage}&limit=${limit}`, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      }, { headers: { token } });
      if (response.data.success) {
        toast.success("Status updated");
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchAllOrders(newPage);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.address.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.includes(searchTerm);
    
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="orders-page">
      <header className="orders-header">
        <div className="header-title">
          <h1>Order Management</h1>
          <p>Track and manage your customer orders efficiently</p>
        </div>
        <div className="header-controls">
          <div className="search-bar">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search by ID or customer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && <X size={14} className="clear-search" onClick={() => setSearchTerm("")} />}
          </div>
          <div className="filter-wrapper">
            <button className={`filter-btn-alt ${statusFilter !== 'All' ? 'active' : ''}`} onClick={() => setShowFilterMenu(!showFilterMenu)}>
              <Filter size={18} /> {statusFilter === 'All' ? 'Filter' : statusFilter}
            </button>
            {showFilterMenu && (
              <div className="filter-dropdown">
                <div className={`filter-item ${statusFilter === 'All' ? 'selected' : ''}`} onClick={() => { setStatusFilter("All"); setShowFilterMenu(false); }}>All Orders</div>
                <div className={`filter-item ${statusFilter === 'Food Processing' ? 'selected' : ''}`} onClick={() => { setStatusFilter("Food Processing"); setShowFilterMenu(false); }}>Food Processing</div>
                <div className={`filter-item ${statusFilter === 'Out For Delivery' ? 'selected' : ''}`} onClick={() => { setStatusFilter("Out For Delivery"); setShowFilterMenu(false); }}>Out For Delivery</div>
                <div className={`filter-item ${statusFilter === 'Delivered' ? 'selected' : ''}`} onClick={() => { setStatusFilter("Delivered"); setShowFilterMenu(false); }}>Delivered</div>
              </div>
            )}
          </div>
        </div>
      </header>

      {loading ? (
        <div className="orders-page-loading">
          <Skeleton type="card" count={limit} />
        </div>
      ) : (
        <>
          <div className="orders-grid">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <div key={index} className={`order-card-premium ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="card-top">
                    <div className="order-id">
                      <Package size={16} />
                      <span>#{order._id.slice(-6).toUpperCase()}</span>
                    </div>
                    <select 
                      className={`status-select ${order.status.toLowerCase().replace(/\s+/g, '-')}`}
                      onChange={(event) => statusHandler(event, order._id)} 
                      value={order.status}
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <div className="card-content">
                    <div className="customer-info">
                      <div className="info-row">
                        <User size={16} />
                        <strong>{order.address.firstName} {order.address.lastName}</strong>
                      </div>
                      <div className="info-row address">
                        <MapPin size={16} />
                        <span>{order.address.street}, {order.address.city}</span>
                      </div>
                      <div className="info-row">
                        <Phone size={16} />
                        <span>{order.address.phone}</span>
                      </div>
                    </div>

                    <div className="items-list">
                      <h4>Items ({order.items.length})</h4>
                      <p>
                        {order.items.map((item, idx) => (
                          <span key={idx}>
                            {item.name} x {item.quantity}{idx < order.items.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </p>
                    </div>

                    <div className="card-footer">
                      <div className="amount-total">
                        <CreditCard size={16} />
                        <span>Total: <strong>${order.amount.toFixed(2)}</strong></span>
                      </div>
                      <div className="order-date">
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-orders">
                <img src={assets.parcel_icon} alt="No orders" />
                <p>No orders found matching your criteria.</p>
                {(searchTerm || statusFilter !== 'All') && <button className="reset-filters" onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}>Reset Filters</button>}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="orders-pagination">
              <button 
                disabled={page === 1} 
                onClick={() => handlePageChange(page - 1)}
                className="page-btn"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="page-indicator">
                Page <span>{page}</span> of {totalPages}
              </div>
              <button 
                disabled={page === totalPages} 
                onClick={() => handlePageChange(page + 1)}
                className="page-btn"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
