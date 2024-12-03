import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUserCircle,
  FaTimes,
  FaBars,
  FaPlus,
} from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";
import "../style.scss";

import logozp from "/src/assets/logoZP.png"; // Import your logo
import Sidebar from "./Sidebar";
import Searchbar from "../../../components/header/Searchbar";
import axiosInstance from "/src/Auth/Axios";

const Header = () => {
  const [query, setQuery] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState(null);
  const userIdRedux = useSelector((state) => state.user.userId);
  const userIdLocalStorage = localStorage.getItem("Id");
  const userId = userIdRedux || userIdLocalStorage;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch user details including profilePic

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the request
              },
            }
          );
          setUserName(response.data.user.username);
          setProfilePic(response.data.user.profilePic);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };
    fetchUserDetails();
  }, [userId]);

  const searchQueryHandler = async (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleSearchClick = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="header">
      <div className="left-menu">
        <div className="hamburger-menu" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <FaTimes className="icon" />
          ) : (
            <FaBars className="icon" />
          )}
        </div>

        <div
          className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}
        >
          <Sidebar />
        </div>
        <div className="header-logo">
          <Link to="/home">
            <img src={logozp} alt="Logo" className="logo" />{" "}
            {/* Add the logo here */}
          </Link>
        </div>
        <nav className="header-nav">
          <Link to="/forum/create-post" className="nav-link">
            {window.innerWidth <= 700 ? (
              <div className="iconWrapper">
                <FaPlus className="createPostIcon" />
                <span className="hoverText">Create Post</span>{" "}
                {/* Optional for tooltip */}
              </div>
            ) : (
              "Create Post"
            )}
          </Link>
        </nav>

        <div className="header-search">
          <Searchbar axiosInstance={axiosInstance} />
          {/* <FaSearch onClick={handleSearchClick} />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
          /> */}
        </div>
      </div>
      <div className="header-icons">
        <Link to="/messages" className="icon-link" data-tooltip="Messages">
          <BsChatDots />
        </Link>
        <Link
          to="/notifications"
          className="icon-link"
          data-tooltip="Notifications"
        >
          <IoMdNotificationsOutline />
        </Link>
        <Link
          to="/login"
          className="icon-link"
          id="logout-icon"
          data-tooltip="Login"
        >
          <BiLogIn />
        </Link>
        <Link
          to={`/profile/${userId}`}
          className="icon-link"
          data-tooltip="Profile"
        >
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="profile-pic" />
          ) : (
            <FaUserCircle />
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
