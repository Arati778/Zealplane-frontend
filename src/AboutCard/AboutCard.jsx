import React from "react";
import "./AboutCardStyle.css";
import growth from "../assets/growth.png";
import reflecting from "../assets/reflecting.png";

const AboutCard = () => {
  return (
    <>
      <div className="head-top" id="about">
        <h1>Many Great Features</h1>
        {/* <p>
          Again, there are other issues like stiff competition, reduced
          attention span of masses, heavy effort-less reward, discouraging
          algorithm, one dimensional approach for reward. Thus, in the market of
          fish, only skins and drama is sold out. which is very good from a
          profit’s point of view but that also discourages the creators that
          lacks the initial push and dedication, lack of required views leads to
          demoralization...
        </p> */}
      </div>

      <div className="cardBox">
        <div className="card1">
          <h1>Our Ambitions</h1>
          <p>
            A portfolio website that can be used as a social networking site to
            connect with people and can be used to find a job? Sounds like
            linked-din! Aren’t we have that already? Indeed we do!
          </p>
          <img
                  src={growth}
                  alt="About feature"
                  className="featureImage"
                />
        </div>
        <div className="card1">
          <h1>Our Ambitions</h1>
          <p>
            A portfolio website that can be used as a social networking site to
            connect with people and can be used to find a job?
          </p>
          <img
                  src={reflecting}
                  alt="About feature"
                  className="featureImage"
                />
        </div>
        <div className="card1">
          <h1>Our Ambitions</h1>
          <p>
            A portfolio website that can be used as a social networking site to
            connect with people and can be used to find a job?
          </p>
          <img
                  src={growth}
                  alt="About feature"
                  className="featureImage"
                />
        </div>
        
      </div>
    </>
  );
};

export default AboutCard;
