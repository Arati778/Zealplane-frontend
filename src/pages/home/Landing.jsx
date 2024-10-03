import React from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import AboutCard from "../../AboutCard/AboutCard";

import Section2 from "../../AboutCard/Section2";
import Navbar from "../../AboutCard/Navbar";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <AboutCard />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Section2 />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Landing;
