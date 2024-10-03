import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import DemoCarausel from "../../../components/carousel/DemoCarousel";
import useFetch from "../../../hooks/useFetch";
import TopicCarousel from "../../../components/carousel/Topics.jsx/TopicsCarousel";

const Topics = () => {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading } = useFetch(`/trending/movie/${endpoint}`);
    console.log(data);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Wnna know something Interesting ?</span>
                <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <TopicCarousel/>
        </div>
    );
};

export default Topics;
