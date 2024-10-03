import React, { useState } from "react";
import "../AboutCard/NavbarStyle.css"; // Assuming the CSS file is named NavbarStyle.css
import logozp from "../assets/logo-zp.jpg";
import Modal from "../AboutCard/Model";
import LoginComponent from "../pages/credentials/LoginComponent";
import RegisterComponent from "../pages/credentials/RegisterComponent";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginClick = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleRegisterClick = () => setShowRegisterModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  return (
    <div className="nav-top">
      <div className="logo-img">
        <img src={logozp} alt="ZealPlane Logo" className="logo-img" />
      </div>
      <div className="nav-menu">
        <button onClick={handleLoginClick}>Log in</button>
        <button onClick={handleRegisterClick}>Join ZealPlane</button>
      </div>
      <Modal show={showLoginModal} handleClose={handleCloseLoginModal}>
        <LoginComponent />
      </Modal>
      <Modal show={showRegisterModal} handleClose={handleCloseRegisterModal}>
        <RegisterComponent />
      </Modal>
    </div>
  );
};

export default Navbar;
