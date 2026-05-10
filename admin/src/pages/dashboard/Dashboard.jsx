import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell 
} from 'recharts';
import { 
    Plus, ExternalLink,
    DollarSign, Users, ShoppingBag, Utensils
} from 'lucide-react';
import Skeleton from '../../components/skeleton/Skeleton';

const Dashboard = ({ url }) => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        statusCounts: {},
        dailyRevenue: [],
        recentOrders: [],
        topProducts: [],
        uniqueCustomers: 0,
        totalFoodItems: 0
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${url}/api/order/stats`);
            if (response.data.success) {
                setStats(response.data.stats);
            }
        } catch (error) {
            // Error handled silently
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const STATUS_COLORS = {
        'Delivered': '#10b981',
        'Out For Delivery': '#3b82f6',
        'Food Processing': '#f59e0b',
        'Default': '#e2e8f0'
    };

    const pieData = Object.entries(stats.statusCounts).map(([name, value]) => ({ name, value }));

    if (loading) return (
        <div className='dash2-container'>
            <header className="dash2-header">
                <div className="header-text">
                    <Skeleton type="line" />
                    <Skeleton type="line" />
                </div>
            </header>
            <div style={{ marginBottom: '2rem' }}>
                <Skeleton type="card" count={4} />
            </div>
            <div className="dash2-charts-row">
                <div className="chart-card-large"><Skeleton type="chart" /></div>
                <div className="chart-card-small"><Skeleton type="chart" /></div>
            </div>
        </div>
    );

    return (
        <div className='dash2-container'>
            <header className="dash2-header">
                <div className="header-text">
                    <h1>Business Dashboard</h1>
                    <p>Monitor your business performance and key metrics in real-time</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary" onClick={() => navigate('/add')}>
                        <Plus size={16} /> Add New Item
                    </button>
                </div>
            </header>

            <div className="dash2-metrics-grid">
                <div className="metric-card">
                    <div className="card-head">
                        <span>Total Revenue</span>
                    </div>
                    <div className="card-body">
                        <h2>${stats.totalRevenue.toLocaleString()}</h2>
                        <p>Total earnings to date</p>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="card-head">
                        <span>Active Customers</span>
                    </div>
                    <div className="card-body">
                        <h2>{stats.uniqueCustomers}</h2>
                        <p>Unique users who ordered</p>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="card-head">
                        <span>Total Orders</span>
                    </div>
                    <div className="card-body">
                        <h2>{stats.totalOrders}</h2>
                        <p>Total orders processed</p>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="card-head">
                        <span>Menu Items</span>
                    </div>
                    <div className="card-body">
                        <h2>{stats.totalFoodItems}</h2>
                        <p>Total items in your menu</p>
                    </div>
                </div>
            </div>

            <div className="dash2-charts-row">
                <div className="chart-card-large">
                    <div className="card-head">
                        <div>
                            <h3>Sales Performance</h3>
                            <p>Revenue trends over time</p>
                        </div>
                    </div>
                    <div className="chart-box">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={stats.dailyRevenue}>
                                <defs>
                                    <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ff6347" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#ff6347" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                                <Tooltip />
                                <Area type="monotone" dataKey="revenue" stroke="#ff6347" strokeWidth={2} fillOpacity={1} fill="url(#fillColor)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="chart-card-small">
                    <div className="card-head">
                        <div>
                            <h3>Order Status</h3>
                            <p>Current stage of active orders</p>
                        </div>
                    </div>
                    <div className="chart-box flex-center">
                        {pieData.length > 0 ? (
                            <>
                                <ResponsiveContainer width="100%" height={220}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || STATUS_COLORS['Default']} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="pie-legend-alt">
                                    {pieData.map((entry, index) => (
                                        <div key={index} className="legend-row">
                                            <span className="dot" style={{ backgroundColor: STATUS_COLORS[entry.name] || STATUS_COLORS['Default'] }}></span>
                                            <span className="name">{entry.name}</span>
                                            <span className="value">{entry.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p className="no-data">No active orders</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="dash2-data-row">
                <div className="table-card">
                    <div className="card-head">
                        <h3>Recent Transactions</h3>
                        <button className="btn-link" onClick={() => navigate('/orders')}>
                            View all <ExternalLink size={14} />
                        </button>
                    </div>
                    <table className="dash2-table">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentOrders.length > 0 ? stats.recentOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>#{order._id.slice(-4).toUpperCase()}</td>
                                    <td>{order.address.firstName}</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td>${order.amount}</td>
                                    <td><span className={`status-dot ${order.status.toLowerCase().replace(/\s+/g, '-')}`}></span> {order.status}</td>
                                </tr>
                            ) ) : (
                                <tr><td colSpan="5" className="no-data-td">No recent transactions</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="table-card">
                    <div className="card-head">
                        <h3>Top Selling Products</h3>
                        <button className="btn-link" onClick={() => navigate('/list')}>
                            View all <ExternalLink size={14} />
                        </button>
                    </div>
                    <div className="top-products-list">
                        {stats.topProducts.length > 0 ? stats.topProducts.map((product, index) => (
                            <div key={index} className="product-item">
                                <div className="prod-img">{product._id[0]}</div>
                                <div className="prod-info">
                                    <h4>{product._id}</h4>
                                    <p>{product.quantity} sold</p>
                                </div>
                                <div className="prod-revenue">${product.revenue.toLocaleString()}</div>
                            </div>
                        )) : (
                            <p className="no-data">No product data available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
