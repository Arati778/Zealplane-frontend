import React, { useState, useEffect } from 'react';

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import Recommended from "./Recommended/Recommended";
import { useNavigate } from 'react-router-dom';
import { setUserId } from '../../store/userAction'; // Import the action to set userId
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../../components/header/Header';
import Curated from './curated/Curated';
import Topics from './curated/Topics';

const Home = () => {
    
const [userDetails, setUserDetails] = useState(null);
const userIdRedux = useSelector((state) => state.user.userId); // Get userId from Redux store
const userIdLocalStorage = localStorage.getItem('Id'); // Get userId from local storage
const userId = userIdRedux || userIdLocalStorage; // Use userId from Redux if available, otherwise use local storage
const navigate = useNavigate();
const dispatch = useDispatch(); // Initialize useDispatch hook
const [profilePic, setProfilePic] = useState(null);

    
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserDetails(response.data);
        setProfilePic(response.data.profilePic);
        localStorage.setItem('username', response.data.username);
        console.log('Username saved to local storage:', response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Dispatch userId to Redux store if not already set
  useEffect(() => {
    if (!userIdRedux && userIdLocalStorage) {
      dispatch(setUserId(userIdLocalStorage));
    }
  }, [dispatch, userIdRedux, userIdLocalStorage]);

  // if (!userDetails) {
  //   navigate('/login');
  //   return null;
  // }


    return (
        <div className="homePage">
           <Header/>
            <HeroBanner />
            <Curated/>
            {/* <Topics/>
            <Trending />
            <Popular />
            <TopRated />
            <Recommended/> */}
        </div>
    );
};

export default Home;
