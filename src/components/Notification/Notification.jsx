import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchNotifications = async () => {
    try {
      // Fetch public notifications
      const res = await axios.get(`${apiBaseUrl}/notification`);
      console.log("Notifications are:", res.data);
      
      if (res.data.length === 0) {
        console.log("No notifications found.");
      }
      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to load notifications."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Polling every 10 seconds
    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notification-bell">
      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <p>{error}</p> // Display error message
      ) : notifications.length === 0 ? (
        <p>No notifications to show</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              <span>{notification.message}</span>
              {/* Remove mark as read button for public notifications */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationBell;
