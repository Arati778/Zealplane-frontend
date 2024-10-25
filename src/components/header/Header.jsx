import React, { useState, useEffect } from "react";
import { FaBell, FaSearch } from "react-icons/fa"; // Import the notification bell icon
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { FiSettings } from "react-icons/fi";
import avatar from "../../assets/avatar.png";
import { setUserId } from "../../store/userAction"; // Import the action to set userId
import axios from "axios";
import logozp from "/src/assets/logoZP.png";
import { CiLogout } from "react-icons/ci";



const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false); // State for showing profile pop-up
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const userIdRedux = useSelector((state) => state.user.userId); // Get userId from Redux store
  const userIdLocalStorage = localStorage.getItem("Id"); // Get userId from local storage
  const userId = userIdRedux || userIdLocalStorage; // Use userId from Redux if available, otherwise use local storage
  const [userName, setUserName] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  
 

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}`
        );
        setUserName(response.data.username);
        setProfilePic(response.data.profilePic);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Dispatch userId to Redux store if not already set
  useEffect(() => {
    if (!userIdRedux && userIdLocalStorage) {
      dispatch(setUserId(userIdLocalStorage));
    }
  }, [dispatch, userIdRedux, userIdLocalStorage]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = async (event) => {
    if (event.key === "Enter" && query.length > 0) {
      console.log(`Search query: ${query}`);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/username/${query}`
        );
        const results = response.data;
        console.log("results are:", results);

        // Check if results array is not empty
        if (results.length > 0) {
          console.log("Search results:", results);
          console.log("First user result:", results[0]); // Log the first user in the array
        } else {
          console.log("No users found.");
        }

        navigate(`/search/${query}`);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const handleSearchClick = async () => {
    if (query.length > 0) {
      console.log(`Search query: ${query}`);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/username/${query}`
        );
        const results = response.data;

        // Check if results array is not empty
        if (results.length > 0) {
          console.log("Search results:", results);
          console.log("First user result:", results[0]); // Log the first user in the array
        } else {
          console.log("No users found.");
        }

        navigate(`/search/${query}`);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setShowSearch(false);
    }
  };

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions); // Toggle profile options pop-up
  };

  const handleLogout = () => {
    // Implement logout logic here
    setShowProfileOptions(false); // Hide the profile options after logout
    console.log("User logged out");
  };

  const handleVisitProfile = () => {
    navigate(`/profile/${userId}`);
    setShowProfileOptions(false); // Hide the profile options pop-up
  };

  const handleNotificationClick = () => {
    navigate(`/home/Notification`);
  };

  const handleForumClick = () => {
    navigate("/forum");
  };

 

  return (
    <header
      className={`header ${show}`}
      style={{
        position: "fixed",
        background: "rgba(0, 0, 0, 0.4)",
        width: "100%",
      }}
    >
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/home")}>
          <img src={logozp} alt="Logo" />
        </div>
        <form className="search-bar">
          <span className="search-icon" onClick={handleSearchClick}>
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
          />
        </form>
        <ul className="menuItems">
          <li className="menuItem" style={{ fontSize: "18px" }}>
            <span onClick={handleForumClick}>Communities</span>
          </li>
          <li
            className="menuItem"
            style={{ color: "white" }}
            onClick={handleNotificationClick}
          >
            <FaBell />
          </li>
          <li className="menuItem">
            <img
              src={profilePic || avatar}
              alt=""
              className="avatarImage"
              onClick={handleProfileClick}
            />
            {userName && <span className="username">{userName}</span>}
            {showProfileOptions && (
              <div className="profile-options">
                <ul>
                  <li onClick={handleVisitProfile}> Profile</li>
                  <hr />
                  <li onClick={handleLogout}>
                    <CiLogout className="header-icon" />
                    VisitLogout
                  </li>
                  <li>
                    <FiSettings className="header-icon" /> Settings
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
            </div>
          </ContentWrapper>
        </div>
      )}

   
    </header>
    
  );
};

export default Header;
