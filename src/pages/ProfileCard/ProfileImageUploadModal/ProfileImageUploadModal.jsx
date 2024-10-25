import React, { useState } from "react";
import { Modal, Upload, Button, Spin, Progress, Typography } from "antd";
import { UploadOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import './ProfileImageUploadModal.scss'; // Add custom styling if needed

const { Text } = Typography;

const ProfileImageUploadModal = ({
  modalVisible,
  closeModal,
  handleFileChange,
  handleFormSubmit,
  loading,
  profilePic,
  setFile,
}) => {
  const [uploading, setUploading] = useState(false); // Track upload state
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress

  const simulateUpload = (file) => {
    setUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          setUploading(false);
          return 100;
        }
        return prevProgress + 20;
      });
    }, 500);

    // Simulate successful upload and trigger onSuccess after progress finishes
    setTimeout(() => {
      handleFileChange({
        file: {
          status: "done",
          response: { url: URL.createObjectURL(file) },
        },
      });
    }, 3000);
  };

  return (
    <Modal
      title="Upload Your Profile Picture"
      visible={modalVisible}
      onCancel={closeModal}
      footer={[
        <Button key="submit" type="primary" onClick={handleFormSubmit} loading={loading}>
          {loading ? <Spin /> : "Submit"}
        </Button>,
        <Button key="cancel" onClick={closeModal}>
          Ok
        </Button>,
      ]}
    >
      <div className="upload-container">
        {/* Image Preview with Edit/Delete Options */}
        {profilePic && (
          <div className="image-preview-container">
            <img
              src={profilePic}
              alt="User Image"
              className="image-preview"
              style={{ maxWidth: "70%", marginBottom: "10px" }}
            />
            <div className="image-preview-actions">
              <Button icon={<EditOutlined />} className="edit-btn">Edit</Button>
              <Button icon={<DeleteOutlined />} className="delete-btn" danger>
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Upload Component */}
        <Upload.Dragger
          showUploadList={false}
          customRequest={({ file, onSuccess }) => {
            setFile(file);
            simulateUpload(file);
          }}
          onChange={(info) => {
            if (info.file && info.file.status === "done" && info.file.response) {
              handleFileChange(info);
            }
          }}
          className="upload-dragger"
          multiple={false} // For single file upload, change to true if needed
          accept="image/*" // Restrict file types to images
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Drag & Drop an image here or click to upload</p>
          <p className="ant-upload-hint">Supports only image files</p>
        </Upload.Dragger>

        {/* Uploading Progress Bar */}
        {uploading && (
          <div className="progress-container">
            <Text>Uploading...</Text>
            <Progress percent={uploadProgress} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ProfileImageUploadModal;
