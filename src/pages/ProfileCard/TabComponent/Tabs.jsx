import React, { useState } from "react";
import FeedbackComponent from "./feedback.jsx";
import "./Tabs.scss";
import ProjectComponent from "./ProjectComponent/ProjectComponent.jsx";

const TabComponent = () => {
  const [activeTabKey, setActiveTabKey] = useState("postroom");

  const tabList = [
    {
      key: "postroom",
      label: "Postroom",
    },
    {
      key: "thoughts",
      label: "Thoughts",
    },
    {
      key: "feedback",
      label: "Feedback",
    },
  ];

  const contentList = {
    postroom: <ProjectComponent />,
    thoughts: <p>Thoughts Content</p>,
    feedback: <FeedbackComponent />,
  };

  return (
    <div className="tab-container">
      <div className="tabs">
        {tabList.map((tab) => (
          <div
            key={tab.key}
            className={`tab-item ${activeTabKey === tab.key ? "active" : ""}`}
            onClick={() => setActiveTabKey(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="tab-content">{contentList[activeTabKey]}</div>
    </div>
  );
};

export default TabComponent;
