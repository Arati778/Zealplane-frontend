import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "./RegisterComponent.scss";
import "/src/AboutCard/ModelStyle.css";
import logozp from "/src/assets/logoZP.png";
import { useDispatch } from "react-redux";
import { setUser, setUserId } from "../../store/userSlice"; // Import setUserId;
import glogo from "/src/assets/Google__G__logo.svg.png";
import { GoogleLogin } from "@react-oauth/google";

export default function RegisterComponent({ showModal, handleClose }) {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const register = async () => {
    try {
      if (
        !credentials.username ||
        !credentials.email ||
        !credentials.password ||
        !confirmPassword
      ) {
        toast.error("All fields are required");
        return;
      }
      if (credentials.username.includes(" ")) {
        toast.error("Username cannot contain spaces");
        return;
      }

      if (credentials.password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Dispatch the user data to Redux
      dispatch(setUser(credentials));

      // Send user data to the backend
      const response = await axios.post(
        `${apiBaseUrl}/users/register`,
        credentials
      );
      console.log("Response from backend:", response.data);
      toast.success("Successfully registered");

      // Navigate to the login page
      navigate("/login");
      handleClose(); // Close the modal after registration
    } catch (err) {
      console.log(err);
      toast.error("Cannot Create your Account");
    }
  };

  const handleGoogleRegister = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      console.log("Google Token:", googleToken);

      // Send the Google token to your backend for verification
      const response = await axios.post(
        `${import.meta.env.VITE_PUBLIC_API}/api/users/google-login`,
        { token: googleToken }
      );

      // Log response data from backend
      console.log("Response from backend:", response.data);

      // Store the access token in localStorage
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("userData", response.data);

      // Store the user ID (from response) in localStorage and Redux
      const userId = response.data.user.id; // assuming your backend response has userId as 'id'
      localStorage.setItem("Id", userId); // Save to localStorage
      dispatch(setUserId(userId)); // Dispatch user ID to Redux store

      console.log("User ID after Google login:", userId);

      // Save full user data to Redux if needed
      dispatch(setUser(response.data.user));

      // Redirect to the home page
      navigate("/home");
    } catch (err) {
      console.error("Error handling Google Sign-In:", err);
      toast.error("Google Sign-in failed. Please try again.");
    }
  };

  return (
    <>
      <div className="logo-img">
        <img src={logozp} alt="ZealPlane Logo" className="logo-img" />
        <span style={{ color: "red", fontWeight: "900", fontSize: "19px" }}>
          ZEALPLANE
        </span>
      </div>
      <div className="login-wrapper">
        <ToastContainer />
        <div className="login-wrapper-inner">
          <h1 className="heading">Make the most of your professional life</h1>
          <div className="auth-inputs">
            <input
              onChange={(event) =>
                setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  username: event.target.value,
                }))
              }
              type="text"
              className="common-input"
              placeholder="Your Unique Name"
            />
            <input
              onChange={(event) =>
                setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  email: event.target.value,
                }))
              }
              type="email"
              className="common-input"
              placeholder="Email or phone number"
            />
            <input
              onChange={(event) =>
                setCredentials((prevCredentials) => ({
                  ...prevCredentials,
                  password: event.target.value,
                }))
              }
              type="password"
              className="common-input"
              placeholder="Password (6 or more characters)"
            />
            <input
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              className="common-input"
              placeholder="Confirm Password"
            />
          </div>
          <button onClick={register} className="login-btn">
            Agree & Join
          </button>
          <div className="google-btn-container">
            <p className="go-to-signup">
              Already on ZealPlan?{" "}
              <span className="join-now" onClick={() => navigate("/login")}>
                Sign in
              </span>
            </p>
          </div>
          <div>
            <GoogleLogin
              onSuccess={(credentialResponse) =>
                handleGoogleRegister(credentialResponse)
              }
              onError={() =>
                toast.error("Google Sign-in failed. Please try again.")
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
