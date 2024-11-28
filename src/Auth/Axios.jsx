import axios from "axios";
import { toast } from "react-toastify";

// Create an Axios instance
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set up the Axios Interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    // Log the full error for debugging
    console.error("Axios Error:", error); // Log the error object
    if (error.response) {
      console.error("Response Error:", error.response); // Log the response if it exists
    }

    if (error.response && error.response.status === 401) {
      // Token expired, attempt to refresh it
      toast.info("Your session has expired. Generating a new token..."); // Notify the user about token expiration

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("refresh token is", refreshToken);
        
        if (!refreshToken) {
          return Promise.reject(error); // If no refresh token, reject the error
        }

        // Request to refresh the token
        const refreshResponse = await axios.post(
            `${apiBaseUrl}/refresh-token`, 
            { refreshToken }, // This should be the exact body sent in Thunder Client
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          

        const { accessToken } = refreshResponse.data; // Assuming response contains 'accessToken'
        localStorage.setItem("token", accessToken); // Update token in localStorage

        // Retry the original request with the new token
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(error.config); // Retry the request with the new token
      } catch (refreshError) {
        console.log("Refresh token failed:", refreshError); // Log the failure reason
        // localStorage.clear(); // Clear all stored data if refresh fails
        // window.location.href = "/login"; // Redirect to login page
        toast.error("Session expired, please log in again.");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Reject other types of errors
  }
);

export default axiosInstance;
