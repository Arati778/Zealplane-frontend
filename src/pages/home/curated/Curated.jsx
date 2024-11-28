import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import DemoCarausel from "../../../components/carousel/DemoCarousel";
import useFetch from "../../../hooks/useFetch";

const Curated = () => {
    const [endpoint, setEndpoint] = useState("day");

    // const { data, loading } = useFetch(`/trending/movie/${endpoint}`);
    // console.log(data);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Read Free Books here</span>
                <SwitchTabs data={["Comics", "Manga"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <DemoCarausel />
        </div>
    );
};

export default Curated;
