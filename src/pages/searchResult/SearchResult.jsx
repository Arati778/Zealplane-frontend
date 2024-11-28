import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import noResults from "../../assets/no-results.png"; // Optional image for no results
import dummyProfilePic from "../../../public/anonymous-profile-silhouette-b714qekh29tu1anb.png"; // Dummy profile pic
import Header from "../../components/header/Header";
import axiosInstance from "../../Auth/Axios";

const SearchResult = () => {
  const [data, setData] = useState([]); // Store user data
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchInitialData = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const res = await axiosInstance.get(
        `http://localhost:5000/api/users/username/${query}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (Array.isArray(res.data) && res.data.length > 0) {
        setData(res.data);
        console.log("search results:", res.data); // Log results for debugging
      } else {
        setData([]); // No results, set data to empty array
      }
    } catch (error) {
      console.error("Error fetching search results", error);
    } finally {
      setLoading(false); // Set loading to false once data fetching is done
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [query]);

  const handleUserClick = (uniqueId) => {
    navigate(`/profile/${String(uniqueId)}`); // Navigate to profile page with uniqueId
  };

  return (
    <div className="searchResultsPage">
      <Header />
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <div className="pageTitle">
            {`Search results for `}
            <span style={{ color: "skyblue", fontWeight: "bold" }}>
              {`${query}`}
            </span>
          </div>

          {data.length === 0 ? (
            <div className="noResults">
              <img src={noResults} alt="No results found" />
              <p>No results found for '{query}'</p>
            </div>
          ) : (
            <div className="content">
              {data.map((user) => (
                <div
                  className="userCard"
                  key={user.uniqueId}
                  onClick={() => handleUserClick(user.uniqueId)}
                >
                  <img
                    src={user.profilePic || dummyProfilePic}
                    alt={user.username}
                    className="profilePic"
                  />
                  <div className="userInfo">
                    <p className="fullName">{user.fullName}</p>
                    <p className="username">
                      <strong></strong> {user.username}
                    </p>
                    <p className="jobRole">{user.jobRole}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResult;
