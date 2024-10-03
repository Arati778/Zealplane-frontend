import React, { useRef, useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import axios from "axios";
import { setUserId } from '../../store/userAction'; // Import the action to set userId

import "./style.scss";

const CarouselUser = ({ endpoint, title }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profilePic, setProfilePic] = useState(null);
    const userIdRedux = useSelector((state) => state.user.userId); // Get userId from Redux store
    const userIdLocalStorage = localStorage.getItem('Id'); // Get userId from local storage
    const userId = userIdRedux || userIdLocalStorage; // Use userId from Redux if available, otherwise use local storage

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://thezealplane-6dsp3b2ixq-uc.a.run.app/users?pageNumber=2&pageSize=4`);
                const formattedData = response.data.map(item => ({
                    ...item,
                    thumbnailLink: item.thumbnailLink || PosterFallback,
                    userName: item.userName
                }));
                setData(formattedData);
                console.log('homePage',response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem"
                                    onClick={() =>
                                        navigate(
                                            `/details/${item.projectID}`
                                        )
                                    }
                                >
                                    <div className="posterBlock">
                                      <Img src={item.thumbnailLink} />
                                      <img src={item.userProfilePic} alt="" className="avatarImage" onClick={() => navigate("/profile")} />
                                  </div>
                                  <div className="textBlock">
                                        <span className="title">
                                        {item.userName}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default CarouselUser;
