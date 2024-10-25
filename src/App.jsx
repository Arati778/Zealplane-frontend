import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { Axios } from "axios";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import ForumHome from "./pages/forum/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import MyComponent from "./utils/projectapi";
import Landing from "./pages/home/Landing";
import RegisterComponent from "./pages/credentials/RegisterComponent";
import AvatarComponent from "./pages/ProfileCard/avatar";
import LoginComponent from "./pages/credentials/LoginComponent";
import DetailsPage from "./pages/ProfileCard/TabComponent/ProjectComponent/DetailsPage/DetailsPage";
import ProjectPage from "./pages/ProfileCard/TabComponent/ProjectComponent/ProjectPage";
import axios from "axios";
import DemoProjectPage from "./components/carousel/DemoProject";
import Notification from "./components/Notification/Notification";
import ForgotPassword from "./pages/credentials/ForgotPassword";
import PostDetail from "./pages/forum/PostDetail";
import CreatePost from "./pages/forum/CreatePost";
import { io } from "socket.io-client";

function App() {
    const dispatch = useDispatch();
    const userIdLocalStorage = localStorage.getItem('Id'); 
    const userId = userIdLocalStorage;
    const { url } = useSelector((state) => state.home);
    console.log(url);
    
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        localStorage.setItem('username', response.data.username);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home/notification" element={<Notification />} />
                <Route path="/details/:projectId" element={<DetailsPage />}/>
                <Route path="/home/:id" element={<DemoProjectPage />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/login" element={<LoginComponent/>} />
                <Route path="/home" element={<Home />} />
                <Route path="/forum" element={<ForumHome/>} />
                <Route path="/post/:id" element={<PostDetail/>} />
                <Route path="/forum/create-post" element={<CreatePost />} />
                <Route path="/profile/:id" element={<AvatarComponent/>}/>
                <Route path="/p" element={<MyComponent/>} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
}

export default App;
