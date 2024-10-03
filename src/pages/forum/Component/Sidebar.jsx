import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFire, FaStar, FaSearch } from 'react-icons/fa';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-header">
          <FaSearch className="icon" />
          <input type="text" placeholder="Search" />
        </div>
        <Link to="/" className="sidebar-link">
          <FaHome className="icon" /> Home
        </Link>
        <Link to="/popular" className="sidebar-link">
          <FaFire className="icon" /> Popular
        </Link>
        <Link to="/favorites" className="sidebar-link">
          <FaStar className="icon" /> Favorites
        </Link>
      </div>
      <div className="sidebar-section">
        <h3>Subreddits</h3>
        <Link to="/r/reactjs" className="sidebar-link">
          r/reactjs
        </Link>
        <Link to="/r/javascript" className="sidebar-link">
          r/javascript
        </Link>
        <Link to="/r/webdev" className="sidebar-link">
          r/webdev
        </Link>
        <Link to="/r/programming" className="sidebar-link">
          r/programming
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
