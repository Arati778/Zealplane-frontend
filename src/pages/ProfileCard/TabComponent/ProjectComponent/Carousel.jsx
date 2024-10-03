// Carousel.js
import React, { useRef, useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import ModalComponent from "../ProjectModal/ProjectModal";
import "./style.scss";

const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClick = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
        console.log("Modal opening:", openModal);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        console.log("Modal closing:", openModal);
    };


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
                <ModalComponent
                    open={openModal}
                    handleCloseModal={handleCloseModal}
                    selectedItem={selectedItem}
                    endpoint={endpoint} 
                />
                
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;
                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem"
                                    onClick={() =>
                                        handleClick({
                                            ...item,
                                            posterUrl,
                                        })
                                    }
                                >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {item.release_date || item.first_air_date}
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

export default Carousel;
