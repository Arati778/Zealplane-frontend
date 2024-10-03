import React from "react";
import Slider from "react-slick";
import "../AboutCard/Section2Style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import section3 from "../assets/zp1.avif";

import sec3 from "../assets/zp-4.avif";
import sec4 from "../assets/zp7.avif";

const Section3Data = [
  {
    heading: "Find skillfull people to grow your small business your Startup.",
    paragraph:
      "Combining these features, we call it a penta-rewarding system,whichwill be displayed either via their stat bar or a line inpentagon asinspired from games like DOTA.",
    image: section3,
  },
  {
    heading:
      "Participate in a RealLIfe RPG game, do what you love and gethired.  .",
    paragraph:
      "Combining these features, we call it a penta-rewarding system,whichwill be displayed either via their stat bar or a line inpentagon asinspired from games like DOTA.",
    image: sec3,
  },
  {
    heading: "Find right Talent for your Requirement effortlessly..",
    paragraph:
      "Combining these features, we call it a penta-rewarding system,whichwill be displayed either via their stat bar or a line inpentagon asinspired from games like DOTA.",
    image: sec4,
  },
];

const Section2 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  return (
    <div className="top-3">
      <Slider {...settings}>
        {Section3Data.map((item, index) => (
          <div key={index}>
            <div className="text-column">
              <div className="text-content">
                <h2>{item.heading}</h2>
                <p>{item.paragraph}</p>
              </div>
              <div className="image-container">
                <img src={item.image} alt="Placeholder Image" />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Section2;
