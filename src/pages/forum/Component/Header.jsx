import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BiLogIn } from 'react-icons/bi';
import '../style.scss';

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/forum/create-post" className="nav-link">Create Post</Link>
      </nav>
      <div className="header-search">
        <FaSearch />
        <input type="text" placeholder="Search" />
      </div>
      <div className="header-icons">
        <Link to="/messages" className="icon-link">
          <BsChatDots />
        </Link>
        <Link to="/notifications" className="icon-link">
          <IoMdNotificationsOutline />
        </Link>
        <Link to="/login" className="icon-link">
          <BiLogIn />
        </Link>
        <Link to="/profile" className="icon-link">
          <FaUserCircle />
        </Link>
      </div>
    </header>
  );
};

export default Header;
