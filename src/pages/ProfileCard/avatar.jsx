import React, { useState, useEffect } from "react";
import { Col, Row, Upload, Avatar, Button, Modal, Spin, message } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import "./avatar.scss";
import RadarChartExample from "./radar";
import MyBio from "./MyBio";
import ProfileCard from "./ProfileCard";
import TabComponent from "./TabComponent/Tabs";
import { useSelector } from "react-redux";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { setUserId } from "../../store/userAction"; // Import the action to set userId
import { useDispatch } from "react-redux"; // Import useDispatch hook
import Header from "../../components/header/Header";
import { FaTimes, FaEdit } from "react-icons/fa";

const AvatarComponent = () => {
  const [activeTabKey, setActiveTabKey] = useState("postroom");
  const [isEditMode, setIsEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [level, setLevel] = useState(1);
  const [imageLink, setImageLink] = useState(null);
  const [file, setFile] = useState(null); // Add file state
  const [loading, setLoading] = useState(false); // Add loading state
  const [modalVisible, setModalVisible] = useState(false); // Add modalVisible state
  const user = useSelector((state) => state.user.user);
  const userIdRedux = useSelector((state) => state.user.userId); // Get userId from Redux store
  const userIdLocalStorage = localStorage.getItem("Id"); // Get userId from local storage
  const userId = userIdRedux || userIdLocalStorage; // Use userId from Redux if available, otherwise use local storage
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const [profilePic, setProfilePic] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const { id } = useParams();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    console.log("User ID:", id);
  }, [id]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId === id) {
          console.log(
            "User ID from Redux/Local Storage matches ID from URL:",
            id
          );
        } else {
          console.log(
            "User ID from Redux/Local Storage does not match ID from URL:",
            id
          );
        }
        const response = await axios.get(
          `${apiBaseUrl}/users/${id || userId}`
        );
        setUserDetails(response.data);
        setProfilePic(response.data.profilePic); // Correctly access profilePic from response.data
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setImageLink(info.file.response.url); // Assuming the server responds with the URL of the uploaded file
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    if (file) {
      formData.append("profilePic", file);
    }

    try {
      // Retrieve the access token from wherever you store it (e.g., localStorage)
      const token = localStorage.getItem("token");
      // Make sure the token exists
      if (!token) {
        setLoading(false);
        alert("Access token is missing. Please log in again.");
        return;
      }

      // Submit the form data with the access token in the headers
      const response = await axios.put(
        `${apiBaseUrl}/users/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      setUserDetails(response.data);
      console.log("Profile data is:", response.data);
      setProfilePic(response.data.profilePic);
      setLoading(false);
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      setLoading(false);
      alert("Failed to update user");
    }
  };

  // Dispatch userId to Redux store if not already set
  useEffect(() => {
    if (!userIdRedux && userIdLocalStorage) {
      dispatch(setUserId(userIdLocalStorage));
    }
  }, [dispatch, userIdRedux, userIdLocalStorage]);

  // if (!userDetails) {
  //   navigate('/login');
  //   return null;
  // }

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/Arati778/repos"
        );
        console.log("Github data:", response.data);
        // Use the response data as needed in your component
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchGithubData();
  }, []);

  const lastDigitsMatch = window.location.href.match(/\d{1,2}$/);
  const lastDigits = lastDigitsMatch
    ? lastDigitsMatch[0].padStart(3, "0")
    : null;

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize(); // Check screen size on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="col" style={{ backgroundColor: "#1e1f23", width: "100%", color: "#d3d4d8" }}>
      <Header />
      
      <ContentWrapper>
        <div className="row">
        <FaEdit />
          {isMobile ? (
            <div style={{ marginTop: "70px" }}>
              <div
                className="card mb-3"
                style={{ background: "", color: "white" }}
              >
                <div className="card-body" style={{ marginRight: "10px" }}>
                  <Row justify="center" align="middle">
                    <Col>
                      <Upload
                      // showUploadList={false}
                      // beforeUpload={beforeUpload}
                      >
                        {imageLink || profilePic ? (
                          <Avatar
                            size={130}
                            gap={2}
                            src={imageLink || profilePic}
                            style={{
                              boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
                              border: "2px solid rgba(255, 0, 0, 0.8)",
                            }}
                          />
                        ) : (
                          <Avatar
                            size={150}
                            gap={2}
                            icon={<UserOutlined size={36} />}
                            style={{
                              boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
                              border: "2px solid rgba(255, 0, 0, 0.8)",
                            }}
                          />
                        )}
                        <div
                          className="upload-overlay"
                          style={{ display: "none" }}
                        >
                          {<UploadOutlined onClick={openModal} />}
                        </div>
                      </Upload>

                      <div>
                        <Modal
                          title="User Details"
                          visible={modalVisible}
                          onCancel={closeModal}
                          footer={null}
                        >
                          {loading ? (
                            <Spin />
                          ) : (
                            imageLink && (
                              <img
                                src={imageLink}
                                alt="User Image"
                                style={{ maxWidth: "100%" }}
                              />
                            )
                          )}
                          <Button
                            type="button"
                            // onClick={handleProfileUpload}
                            style={{
                              background:
                                "linear-gradient(45deg, #232146, #3b2055)",
                              border: "none",
                              color: "#fff",
                              padding: "10px 15px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              transition: "background 0.3s", // Add transition for smooth effect
                            }}
                            onMouseOver={(e) => {
                              e.target.style.background =
                                "linear-gradient(45deg, #3b2055, #232146)";
                            }}
                            onMouseOut={(e) => {
                              e.target.style.background =
                                "linear-gradient(45deg, #232146, #3b2055)";
                            }}
                          >
                            Upload Image
                          </Button>
                          <Button type="button" onClick={closeModal}>
                            Ok
                          </Button>
                        </Modal>
                      </div>
                    </Col>
                  </Row>

                  <div className="text-center text-sm-left mb-2 mb-sm-0">
                    {isEditMode ? (
                      <>
                        <input type="text" onChange={(e) => {}} />
                        <input type="text" onChange={(e) => {}} />
                        <button type="button">Save</button>
                      </>
                    ) : (
                      <>
                        {user || userDetails ? (
                          <>
                            <h5 className="pt-sm-2 pb-1 mb-0 mt-3 text-nowrap">
                              {userDetails.fullName}
                            </h5>
                            <p
                              className="mb-2"
                              style={{ marginBottom: "2rem" }}
                            >
                              @{user || userDetails.username}
                            </p>
                            <p
                              className="mb-0"
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "#00bcd4",
                              }}
                            >
                              Level: {level}
                            </p>
                          </>
                        ) : (
                          <p>User data not available</p>
                        )}
                      </>
                    )}
                    <Row justify="center" style={{ marginTop: "20px" }}>
                      <Col>
                        <Button
                          type="button"
                          className="custom-button"
                          // onClick={handleEnquiry}
                        >
                          Enquiry
                        </Button>
                      </Col>
                    </Row>
                    <div className="text-muted">
                      <small style={{ color: "white" }}>Last seen status</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col mb-3" style={{ marginTop: "50px" }}>
                <ProfileCard />
                <br />
                <TabComponent
                  activeTabKey={activeTabKey}
                  onTabChange={handleTabChange}
                />
              </div>
              <div
                className="card"
                style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
              >
                <div
                  className="card-body"
                  style={{
                    background: "rgba(55, 65, 122, 0.1)",
                    color: "white",
                  }}
                >
                  <h6 className="card-title font-weight-bold">Rewards</h6>
                  <RadarChartExample />
                </div>
              </div>
              <div
                className="card"
                style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
              >
                <div
                  className="card-body"
                  style={{
                    background: "rgba(55, 65, 122, 0.1)",
                    color: "white",
                  }}
                >
                  <MyBio />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="col mb-3" style={{ marginTop: "50px" }}>
                <ProfileCard />
                <br />
                <TabComponent
                  activeTabKey={activeTabKey}
                  onTabChange={handleTabChange}
                />
              </div>

              <br />
              <br />
              <div
                className="col-6 col-md-3 mb-6"
                style={{ marginTop: "70px" }}
              >
                <div
                  className="card mb-3"
                  style={{
                    background: "rgba(55, 65, 122, 0.1)",
                    color: "white",
                  }}
                >
                  <div className="card-body" style={{ marginRight: "10px" }}>
                    <Row justify="center" align="middle">
                      <Col>
                      <Upload
  showUploadList={false}
  customRequest={({ file, onSuccess }) => {
    setFile(file);
    
    // Simulate a successful upload
    setTimeout(() => {
      onSuccess(null, file);
      handleFileChange({
        file: {
          status: "done",
          response: { url: URL.createObjectURL(file) }, // Make sure this is set correctly
        },
      });
    }, 1000);
  }}
  onChange={(info) => {
    if (info.file && info.file.status === "done" && info.file.response) {
      handleFileChange(info);
    }
  }}
  onClick={openModal}
>
  {profilePic ? (
    <Avatar
      size={130}
      gap={2}
      src={profilePic}
      style={{
        boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
        border: "2px solid rgba(255, 0, 0, 0.8)",
      }}
    />
  ) : (
    <Avatar
      size={150}
      gap={2}
      icon={<UserOutlined size={36} />}
      style={{
        boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
        border: "2px solid rgba(255, 0, 0, 0.8)",
      }}
    />
  )}
</Upload>


                        <Modal
                          title="User Details"
                          visible={modalVisible}
                          onCancel={closeModal}
                          footer={[
                            <Button
                              key="submit"
                              type="primary"
                              onClick={handleFormSubmit}
                              loading={loading}
                            >
                              {loading ? <Spin /> : "Upload Image"}
                            </Button>,
                            <Button key="cancel" onClick={closeModal}>
                              Ok
                            </Button>,
                          ]}
                        >
                          {profilePic && (
                            <img
                              src={profilePic}
                              alt="User Image"
                              style={{ maxWidth: "100%" }}
                            />
                          )}
                        </Modal>
                      </Col>
                    </Row>

                    <div className="text-center text-sm-left mb-2 mb-sm-0">
                      {isEditMode ? (
                        <>
                          <input type="text" onChange={(e) => {}} />
                          <input type="text" onChange={(e) => {}} />
                          <button type="button">Save</button>
                        </>
                      ) : (
                        <>
                          {user || userDetails ? (
                            <>
                              <h5 className="pt-sm-2 pb-1 mb-0 mt-3 text-nowrap">
                                {userDetails.fullName}
                              </h5>
                              <p
                                className="mb-2"
                                style={{ marginBottom: "2rem" }}
                              >
                                @{user || userDetails.username}
                              </p>
                              <p
                                className="mb-0"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  color: "#00bcd4",
                                }}
                              >
                                Level: {level}
                              </p>
                            </>
                          ) : (
                            <p>User data not available</p>
                          )}
                        </>
                      )}
                      <Row justify="center" style={{ marginTop: "20px" }}>
                        <Col>
                          <Button
                            type="button"
                            className="custom-button"
                            // onClick={handleEnquiry}
                          >
                            Enquiry
                          </Button>
                        </Col>
                      </Row>
                      <div className="text-muted">
                        <small style={{ color: "white" }}>
                          Last seen status
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="card"
                  style={{
                    background: "rgba(55, 65, 122, 0.1)",
                    color: "white",
                  }}
                >
                  <div
                    className="card-body"
                    style={{
                      background: "rgba(55, 65, 122, 0.1)",
                      color: "white",
                    }}
                  >
                    <h6 className="card-title font-weight-bold">Rewards</h6>
                    <RadarChartExample/>
                  </div>
                </div>

                <div
                  className="card"
                  style={{
                    background: "rgba(55, 65, 122, 0.1)",
                    color: "white",
                  }}
                >
                  <div
                    className="card-body"
                    style={{
                      background: "rgba(55, 65, 122, 0.1)",
                      color: "white",
                    }}
                  >
                    {/* <MyBio /> */}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* <div className="col mb-3" style={{ marginTop: "50px" }}>
            <ProfileCard />
            <br />
            <TabComponent
              activeTabKey={activeTabKey}
              onTabChange={handleTabChange}
            />
          </div>

          <br />
          <br />
          <div className="col-6 col-md-3 mb-6" style={{ marginTop: "70px" }}>
            <div
              className="card mb-3"
              style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
            >
              <div className="card-body" style={{ marginRight: "10px" }}>
                <Row justify="center" align="middle">
                  <Col>
                    <Upload showUploadList={false} beforeUpload={beforeUpload}>
                      {imageLink || profilePic ? (
                        <Avatar
                          size={130}
                          gap={2}
                          src={imageLink || profilePic}
                          style={{
                            boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
                            border: "2px solid rgba(255, 0, 0, 0.8)",
                          }}
                        />
                      ) : (
                        <Avatar
                          size={150}
                          gap={2}
                          icon={<UserOutlined size={36} />}
                          style={{
                            boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)",
                            border: "2px solid rgba(255, 0, 0, 0.8)",
                          }}
                        />
                      )}
                      <div
                        className="upload-overlay"
                        style={{ display: "none" }}
                      >
                        {lastDigits === userId && (
                          <UploadOutlined onClick={openModal} />
                        )}
                      </div>
                    </Upload>

                    <div>
                      <Modal
                        title="User Details"
                        visible={modalVisible}
                        onCancel={closeModal}
                        footer={null}
                      >
                        {loading ? (
                          <Spin />
                        ) : (
                          imageLink && (
                            <img
                              src={imageLink}
                              alt="User Image"
                              style={{ maxWidth: "100%" }}
                            />
                          )
                        )}
                        <Button
                          type="button"
                          onClick={handleProfileUpload}
                          style={{
                            background:
                              "linear-gradient(45deg, #232146, #3b2055)",
                            border: "none",
                            color: "#fff",
                            padding: "10px 15px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            transition: "background 0.3s", // Add transition for smooth effect
                          }}
                          onMouseOver={(e) => {
                            e.target.style.background =
                              "linear-gradient(45deg, #3b2055, #232146)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.background =
                              "linear-gradient(45deg, #232146, #3b2055)";
                          }}
                        >
                          Upload Image
                        </Button>
                        <Button type="button" onClick={closeModal}>
                          Ok
                        </Button>
                      </Modal>
                    </div>
                  </Col>
                </Row>

                <div className="text-center text-sm-left mb-2 mb-sm-0">
                  {isEditMode ? (
                    <>
                      <input type="text" onChange={(e) => {}} />
                      <input type="text" onChange={(e) => {}} />
                      <button type="button">Save</button>
                    </>
                  ) : (
                    <>
                      {user || userDetails ? (
                        <>
                          <h5 className="pt-sm-2 pb-1 mb-0 mt-3 text-nowrap">
                            {userDetails.fullName}
                          </h5>
                          <p className="mb-2" style={{ marginBottom: "2rem" }}>
                            @{user || userDetails.username}
                          </p>
                          <p
                            className="mb-0"
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              color: "#00bcd4",
                            }}
                          >
                            Level: {level}
                          </p>
                        </>
                      ) : (
                        <p>User data not available</p>
                      )}
                    </>
                  )}
                  <Row justify="center" style={{ marginTop: "20px" }}>
                    <Col>
                      <Button
                        type="button"
                        className="custom-button"
                        onClick={handleEnquiry}
                      >
                        Enquiry
                      </Button>
                    </Col>
                  </Row>
                  <div className="text-muted">
                    <small style={{ color: "white" }}>Last seen status</small>
                  </div>
                </div>
              </div>
            </div> */}
          {/* <div
            className="card"
            style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
          >
            <div
              className="card-body"
              style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
            >
              <h6 className="card-title font-weight-bold">Rewards</h6>
              <RadarChartExample />
            </div>
          </div>
          <div
            className="card"
            style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
          >
            <div
              className="card-body"
              style={{ background: "rgba(55, 65, 122, 0.1)", color: "white" }}
            >
              <MyBio />
            </div>
          </div> */}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default AvatarComponent;
