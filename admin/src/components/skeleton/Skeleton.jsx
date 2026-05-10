import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type, count = 1 }) => {
    const items = Array(count).fill(0);

    if (type === "card") {
        return (
            <div className="skeleton-grid">
                {items.map((_, i) => (
                    <div key={i} className="skeleton-card">
                        <div className="skeleton-line head"></div>
                        <div className="skeleton-line body"></div>
                        <div className="skeleton-line small"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === "table") {
        return (
            <div className="skeleton-table">
                <div className="skeleton-row-head"></div>
                {items.map((_, i) => (
                    <div key={i} className="skeleton-row">
                        <div className="skeleton-cell img"></div>
                        <div className="skeleton-cell text"></div>
                        <div className="skeleton-cell text"></div>
                        <div className="skeleton-cell action"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === "chart") {
        return (
            <div className="skeleton-chart-container">
                <div className="skeleton-chart"></div>
                <div className="skeleton-chart-legend">
                    <div className="skeleton-dot"></div>
                    <div className="skeleton-dot"></div>
                    <div className="skeleton-dot"></div>
                </div>
            </div>
        );
    }

    return <div className="skeleton-line"></div>;
};

export default Skeleton;
