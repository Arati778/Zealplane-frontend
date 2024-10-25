import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./style.scss";
import axios from "axios";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png"; // Optional image for no results
import dummyProfilePic from "../../../public/anonymous-profile-silhouette-b714qekh29tu1anb.png"; // Import your dummy profile pic

const SearchResult = () => {
    const [data, setData] = useState([]); // Store all user data
    const [loading, setLoading] = useState(false);
    const { query } = useParams();
    const navigate = useNavigate(); // Initialize navigate

    const fetchInitialData = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
            const res = await axios.get(`http://localhost:5000/api/users/username/${query}`);
            if (Array.isArray(res.data) && res.data.length > 0) {
                setData(res.data); // Set all users from the array
                console.log("search results:", res.data); // Log all users for debugging
            } else {
                setData([]); // No data found, set data to empty array
            }
        } catch (error) {
            console.error("Error fetching search results", error); // Log errors if any
        } finally {
            setLoading(false); // Set loading to false after data is fetched or an error occurs
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, [query]);

    const handleUserClick = (uniqueId) => {
        // Ensure userId is treated as a string when navigating
        navigate(`/profile/${String(uniqueId)}`); // Convert userId to a string explicitly
    };

    return (
        <div className="searchResultsPage">
            {loading && <div>Loading...</div>}
            {!loading && (
                <ContentWrapper>
                    {data.length > 0 ? (
                        <>
                            <div className="pageTitle">{`Search results for '${query}'`}</div>
                            <div className="content">
                                {data.map((user) => (
                                    <div
                                        className="userCard"
                                        key={user.uniqueId} // Use userId for the key
                                        onClick={() => handleUserClick(user.uniqueId)} // Attach onClick event
                                    >
                                        <img
                                            src={user.profilePic || dummyProfilePic} // Use dummy profile pic if no profilePic
                                            alt={user.username}
                                            className="profilePic"
                                        />
                                        <div className="userInfo">
                                            <p><strong></strong> {user.username}</p>
                                            <p><strong>Full Name:</strong> {user.fullName}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="resultNotFound">
                            <img src={noResults} alt="No results found" />
                            <span>Sorry, no results found!</span>
                        </div>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;
