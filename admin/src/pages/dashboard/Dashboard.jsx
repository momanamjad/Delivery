import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = ({ url }) => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        statusCounts: {}
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${url}/api/order/stats`);
            if (response.data.success) {
                setStats(response.data.stats);
            } else {
                toast.error("Failed to fetch statistics");
            }
        } catch (error) {
            toast.error("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) return <div className="dashboard-loading">Loading Analytics...</div>;

    return (
        <div className='dashboard'>
            <div className="dashboard-header">
                <h1>Business Overview</h1>
                <p>Real-time analytics for your delivery service</p>
            </div>

            <div className="dashboard-cards">
                <div className="stat-card">
                    <div className="stat-icon revenue">💰</div>
                    <div className="stat-info">
                        <h3>Total Revenue</h3>
                        <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orders">📦</div>
                    <div className="stat-info">
                        <h3>Total Orders</h3>
                        <p className="stat-value">{stats.totalOrders}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon growth">📈</div>
                    <div className="stat-info">
                        <h3>Active status</h3>
                        <p className="stat-value">{Object.keys(stats.statusCounts).length} Stages</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="status-distribution">
                    <h3>Order Status Distribution</h3>
                    <div className="status-list">
                        {Object.entries(stats.statusCounts).map(([status, count]) => (
                            <div key={status} className="status-item">
                                <span className="status-label">{status}</span>
                                <div className="status-bar-container">
                                    <div 
                                        className="status-bar" 
                                        style={{ width: `${(count / stats.totalOrders) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="status-count">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
