import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFire, FaStar, FaSearch, FaTimes, FaBars } from 'react-icons/fa';
import './Sidebar.scss';

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
   <>
      <div className="hamburger-menu" onClick={toggleSidebar}>
          {isOpen? <FaTimes className='icon'/> : <FaBars className='icon'/>}
      </div>

    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-section">
        {/* <div className="sidebar-header">
          <FaSearch className="icon" />
          <input type="text" placeholder="Search" />
        </div> */}
        <Link to="/home" className="sidebar-link">
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
    </>
  );
};

export default Sidebar;
