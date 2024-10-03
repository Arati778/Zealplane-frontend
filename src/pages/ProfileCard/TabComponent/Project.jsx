import React, { useState } from 'react';
import { Button, Card, Image, Modal, Avatar } from 'antd';
import { LikeOutlined, HeartOutlined, MessageOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';

const PostroomComponent = ({ images, visibleImageCount, handleImageClick, handleLoadMoreClick, handleUsernameClick, project, modalVisible, setModalVisible, selectedImage, handleLikeClick, handleWishlistClick, handleEnquiryClick, projectDescription, imageDescription }) => {
    return (
      <div className="row">
        <div className="col-md-12">
          <p>My Project</p>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
            {images.slice(0, visibleImageCount).map((image, index) => (
              <Card
                key={index}
                className="image-card"
                style={{
                  marginRight: '16px',
                  marginBottom: '16px',
                  width: '300px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)', // Add a dark box shadow
                }}
              >
                <a
                  href="#"
                  data-lity=""
                  className="profile-img-list-link"
                  onClick={() => handleImageClick(image.src, image.description, image.projectDesc)}
                >
                  <Image width={250} src={project.imageLink} />
                </a>
              </Card>
            ))}
  
            {images.length > visibleImageCount && (
              <Button
                className="profile-img-number"
                onClick={handleLoadMoreClick}
                size={'large'}
              >
                Load More
              </Button>
            )}
  
            <Button
              className="profile-img-number"
              onClick={handleUsernameClick}
              size={'large'}
            >
              <PlusOutlined />
            </Button>
          </div>
        </div>
  
        <Modal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button
              key="like"
              icon={<LikeOutlined style={{ color: 'red' }} />}
              onClick={handleLikeClick}
            >
              Like
            </Button>,
            <Button
              key="wishlist"
              icon={<HeartOutlined style={{ color: 'red' }} />}
              onClick={handleWishlistClick}
            >
              Wishlist
            </Button>,
            <Button
              key="enquiry"
              icon={<MessageOutlined />}
              onClick={handleEnquiryClick}
            >
              Enquiry
            </Button>,
          ]}
          width={1000}
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar icon={<UserOutlined />} size={40} style={{ marginRight: '10px' }} />
                <span>Username</span>
              </div>
              <Card size="small" title="Go to">
              </Card>
            </div>
          }
        >
          <h2>Project Title {projectDescription}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Description Box - Left */}
            <Card style={{ backgroundColor: 'transparent', width: "50%" }}>
              <div style={{ padding: '0px', width: '100%' }}>
                <p>Project Description: {imageDescription}</p>
              </div>
            </Card>
  
            {/* Image - Center */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: "70%" }}>
              <Image width="600px" src={selectedImage} />
            </div>
  
            {/* Description Box - Right */}
            {/* <div style={{ flex: 1, paddingLeft: '10px' }}>
              <p>Image Description: {imageDescription}</p>
            </div> */}
          </div>
        </Modal>
      </div>
    );
  };
  
  export default PostroomComponent;
  