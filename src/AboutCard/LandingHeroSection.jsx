import React from "react";
import "./LandingHeroSecStyle.scss";
import ther1 from "../assets/spiderman-with-colorful-background.jpg"; // Import your image here

const LandingHeroSection = () => {
  return (
    <div className="landing-hero-section">
      <div className="image-wrapper-landing">
        <img src={ther1} alt="Hero" className="imge" />
        <div className="text">
          <h1>Responsive meta tag</h1>
          <p>
            Chat History is off for this browser. When history is turned off, new chats
            on this browser won't appear in your history on any of your devices, be used
            to train our models, or stored for longer than 30 days. This setting does not
            sync across browsers or devices.
          </p>
          <button>Zeal</button>
          <button>Passion</button>
          <button>Dream</button>
        </div>
      </div>
    </div>
  );
};

export default LandingHeroSection;
