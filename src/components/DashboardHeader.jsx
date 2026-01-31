import { useState } from 'react';

const DashboardHeader = ({ title }) => {
  const [notifications] = useState(3);

  return (
    <div className="dashboard-header">
      <h1>{title}</h1>
      <div className="header-actions">
        <button className="notification-btn">
          <i className="fas fa-bell"></i>
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </button>
        <button className="user-menu">
          <i className="fas fa-user-circle"></i>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;