import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import logozp from "/src/assets/logoZP.png";
import { useDispatch } from "react-redux";
import { setUserId } from "../../store/userAction";

export default function LoginComponent() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async () => {
    try {
      toast.success("Signed In to ZealPlane!");

      const response = await axios.post(`${apiBaseUrl}/users/login`, {
        email: credentials.email,
        password: credentials.password,
      });

      console.log("Response Data after logging in:", response.data);

      const { id: userId, username, token, refreshToken } = response.data;

      // Store tokens and user details
      localStorage.setItem("Id", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
        console.log("Refresh Token received and saved:", refreshToken);
      } else {
        console.warn("No refresh token received in the response.");
      }

      dispatch(setUserId(userId));
      navigate("/home");
    } catch (err) {
      console.log("Login error:", err);
      toast.error("Please Check your Credentials");
    }
  };

  const handleSignInClick = () => {
    navigate("/signin"); // Redirect to the sign-in page
  };

  const handleJoinNowClick = () => {
    navigate("/register"); // Redirect to the registration page
  };

  return (
    <>
      {" "}
      <div className="logo-img">
        <img src={logozp} alt="ZealPlane Logo" className="logo-img" />
        <span style={{ color: "red", fontWeight: "900", fontSize: "19px" }}>
          ZEALPLANE
        </span>
      </div>
      <div className="login-wrapper">
        <ToastContainer />
        <div className="login-wrapper-inner">
          <h1 className="heading">Sign in</h1>
          <p className="sub-heading">Stay updated on your professional world</p>

          <div className="auth-inputs">
            <input
              onChange={(event) =>
                setCredentials({ ...credentials, email: event.target.value })
              }
              type="email"
              className="common-input"
              placeholder="Email or Phone"
            />

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="common-input password-input"
                placeholder="Password"
                value={credentials.password}
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    password: event.target.value,
                  })
                }
              />
              <button
                type="button"
                className="toggle-password-visibility"
                onClick={handlePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button onClick={login} className="login-btn">
            Sign in
          </button>
          <div>Or</div>
          <button onClick={handleJoinNowClick} className="join-now-btn">
            Join now
          </button>
        </div>
      </div>
    </>
  );
}
