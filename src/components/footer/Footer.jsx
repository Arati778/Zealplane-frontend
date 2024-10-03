// Footer.js

import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import { logoutUser } from "../../store/userAction"; // Import logoutUser action

import ContentWrapper from "../contentWrapper/ContentWrapper";
import LogOutImage from "../../assets/logout.png";
import "./style.scss";

const Footer = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Get dispatch function from useDispatch

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem">Terms Of Use</li>
                    <li className="menuItem">Privacy-Policy</li>
                    <li className="menuItem">About</li>
                    <li className="menuItem">Blog</li>
                    <li className="menuItem">FAQ</li>
                </ul>
                <div className="infoText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </div>
                <div className="socialIcons">
                    <span className="icon">
                        <FaFacebookF />
                    </span>
                    <span className="icon">
                        <FaInstagram />
                    </span>
                    <span className="icon">
                        <FaTwitter />
                    </span>
                    <span className="icon">
                        <FaLinkedin />
                    </span>
                    <span className="icon">
                        <button className="logoutButton" onClick={handleLogout} style={{ borderRadius: '50%' }}>
                            <img src={LogOutImage} alt="Log Out" className="logoutIcon" />
                        </button>
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;
