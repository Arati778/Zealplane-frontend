import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import CarouselUser from "../../../components/carousel/CarouselUser";

const Recommended = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/${endpoint}/popular`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Recommended</span>
                <SwitchTabs
                    data={["Recommended", "Curated"]}
                    onTabChange={onTabChange}
                />
            </ContentWrapper>
            <CarouselUser
            />
        </div>
    );
};

export default Recommended;
