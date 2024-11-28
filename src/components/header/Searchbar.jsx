import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import avatar from "../../assets/avatar.png";

const Searchbar = ({ axiosInstance }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchList, setShowSearchList] = useState(false);
  const navigate = useNavigate();

  const searchQueryHandler = async (event) => {
    const searchQuery = event.target.value.trim(); // Trim whitespace from input
    setQuery(searchQuery); // Update the query state
    const token = localStorage.getItem("token");

    if (event.key === "Enter" && searchQuery.length > 0) {
      // Navigate to the SearchResult component on pressing Enter
      navigate(`/search/${searchQuery}`);
      setShowSearchList(false); // Hide search results dropdown
    } else if (searchQuery.length > 0) {
      try {
        const response = await axiosInstance.get(
          `users/username/${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );

        const filteredResults = response.data.filter(
          (user) => user.fullName && user.profilePic
        );

        const sortedResults = filteredResults.sort((a, b) => {
          const matchA = a.fullName
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase())
            ? 1
            : 0;
          const matchB = b.fullName
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase())
            ? 1
            : 0;

          if (matchA === matchB) {
            return a.fullName.localeCompare(b.fullName);
          }

          return matchB - matchA;
        });

        setSearchResults(sortedResults);
        setShowSearchList(true); // Show the dropdown with results
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
      setShowSearchList(false); // Hide the dropdown when the input is cleared
    }
  };

  const handleSearchItemClick = (userId) => {
    navigate(`/profile/${userId}`);
    setShowSearchList(false); // Hide the search results after click
  };

  return (
    <form className="search-bar">
      <span className="search-icon">
        <FaSearch />
      </span>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={searchQueryHandler}
        onKeyDown={searchQueryHandler} // Trigger the handler on key press
      />
      {showSearchList && query.length > 0 && (
        <div className="search-results-list">
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div
                key={user.uniqueId}
                className="search-result-item"
                onClick={() => handleSearchItemClick(user.uniqueId)}
              >
                <FaSearch className="search-item-icon" />
                <img
                  src={user.profilePic || avatar} // Use user's profilePic or fallback to default avatar
                  alt={`${user.fullName}'s avatar`}
                  className="search-result-avatar"
                />
                <div className="search-user-details">
                  <span className="user-fullname">{user.fullName}</span>
                  <span className="user-jobrole"> • {user.jobRole}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No results found</p>
          )}
        </div>
      )}
    </form>
  );
};

export default Searchbar;
