// src/components/Logout.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import "../style.scss";

const Logout = ({ onLogoutComplete }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage data on logout
    localStorage.removeItem("googleUser");
    localStorage.removeItem("Id");
    localStorage.removeItem("token"); // Clear the token if it's stored under this key

    console.log("User logged out");
    console.log("Token cleared:", !localStorage.getItem("token")); // Check if the token is cleared

    // Notify parent component if needed
    if (onLogoutComplete) {
      onLogoutComplete();
    }

    // Redirect the user to the login page
    navigate("/login");
  };

  return (
    <div onClick={handleLogout} className="logout-item">
      <CiLogout className="header-icon" />
      Logout
    </div>
  );
};

export default Logout;
