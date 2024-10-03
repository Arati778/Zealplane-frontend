import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";


const HeroBanner = ({ selectedPosterUrl }) => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");
    const [datas, setDatas] = useState("");
    
    console.log("imported posteUrl", selectedPosterUrl);

    // useEffect(() => {
    //     const bg =
    //         url.backdrop +
    //         data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    //     setBackground(bg);

    //     const timer = setInterval(() => {
    //         const newBg =
    //             url.backdrop +
    //             data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    //         setBackground(newBg);
    //     }, 1000);

    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, [data, url]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get("http://localhost:8000/projects");
                setDatas(res.data);
                console.log(datas);
    
                // Assuming res.data is an array of projects
                const projectImageLinks = datas.map((project) => project.projectImageLink);
                const bg = projectImageLinks[0]; // Initialize with the first image
                setBackground(bg);
    
                let index = 1;
                const interval = setInterval(() => {
                    if (index >= projectImageLinks.length) {
                        index = 0;
                    }
                    setBackground(projectImageLinks[index]);
                    index++;
                }, 5000); // Change image every 5 seconds
    
                return () => {
                    clearInterval(interval);
                };
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchProject(); // Call the fetchProject function
    }, []);
    
    

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                <div className="description">
                    {data?.results?.[Math.floor(Math.random() * 20)]?.overview}
                 </div>
                    {/* <span className="title">Welcome ZealYoddha.</span>
                    <span className="subTitle">
                        Create your portfolio for free and stay updated with trending jobs.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="ignite your passion here...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div> */}
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
