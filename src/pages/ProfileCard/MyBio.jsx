import React from 'react';
import { Card, List } from 'antd';
import { Steps } from 'rsuite';

const MyBio = () => {

  const styles = {
    width: '200px',
    display: 'inline-table',
    verticalAlign: 'top'
  };

  const data = [
    'Setup your profile',
    'Setup your dp',
    'Complete your first project',
  ];

  return (
    <>

    <Steps current={1} vertical style={styles}>
      <Steps.Item title="Finished" description='Setup your profile'/>
      <Steps.Item title="In Progress" description='Setup your dp'/>
      <Steps.Item title="Waiting" description='Complete your first project'/>
      <Steps.Item title="Waiting" description="Get your first view on your project" />
    </Steps>
   
    </>
  );
};

export default MyBio;
