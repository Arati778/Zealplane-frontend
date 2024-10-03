import React from 'react';
import { Modal, Form, Input, Select, Button, TextArea } from 'antd';
import axios from 'axios';

const YourModalComponent = ({ isModalVisible, handleModalClose, onCancel }) => {
  const onFinish = async (values) => {
    try {
      // Send form data to the backend using Axios
      await axios.post('http://localhost:4000/project', values);

      // Handle success, close the modal, or perform any other actions
      handleModalClose();
    } catch (error) {
      // Handle error, show a message to the user, log it, etc.
      console.error('Error submitting form:', error);
    }
  };

  return (
 
<Modal
        title="Your Modal Title"
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
      >
          <Form onFinish={onFinish}>


        <Form.Item label="Project Name" name="projectName">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Arts & literature</Select.Option>
            <Select.Option value="demo">Coding</Select.Option>
            <Select.Option value="demo">Beauty</Select.Option>
          </Select>
          
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        {/* <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button type="default" onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
      </Modal>
  );
};

export default YourModalComponent;

