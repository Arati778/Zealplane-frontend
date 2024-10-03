import React, { useState } from 'react';
import { Card, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import YoutubeIcon from "../../../../../assets/youtube.png";
import Github from "../../../../../assets/github.png";
import Devianart from "../../../../../assets/devianart.png";
import Behance from "../../../../../assets/behance.png";
import Dribble from "../../../../../assets/dribble.png";
import { FaPlus } from "react-icons/fa";

const DummyCards = () => {
  const [open, setOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const dummyData = [
    {
      id: 1,
      projectName: 'youtube',
      photoLink: YoutubeIcon,
      projectDescription: 'This is a dummy project description 1.',
    },
    {
      id: 2,
      projectName: 'github',
      photoLink: Github,
      projectDescription: 'This is a dummy project description 2.',
    },
    {
      id: 3,
      projectName: 'devianart',
      photoLink: Devianart,
      projectDescription: 'This is a dummy project description 3.',
    },
    {
      id: 4,
      projectName: 'behance',
      photoLink: Behance,
      projectDescription: 'This is a dummy project description 4.',
    },
    {
      id: 5,
      projectName: 'Dribble',
      photoLink: Dribble,
      projectDescription: 'This is a dummy project description 5.',
    },
  ];

  const handleClick = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVideoUrl('');
    setSelectedProject(null);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoUrl}&key=YOUR_API_KEY&part=snippet`);
      const data = await response.json();
      
      if (data.items.length > 0) {
        const videoDetails = data.items[0].snippet;
        console.log('Video Details:', videoDetails);
        // You can use the videoDetails object here to display video information
      } else {
        console.log('Video not found');
      }
      
      handleClose();
    } catch (error) {
      console.error('Error fetching video details:', error);
      handleClose();
    }
  };  

  return (
    <div>
      {dummyData.map((item) => (
        <Card
          key={item.id}
          style={{
            width: '150px',
            height: '50px',
            margin: '10px',
            backgroundColor: 'white',
            borderRadius: '5px',
            display: 'inline-block',
            transition: 'background-color 0.2s, box-shadow 0.2s, transform 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
            e.currentTarget.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          onClick={() => handleClick(item)}
        >
          <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={item.photoLink} alt={`Thumbnail ${item.id}`} style={{ width: '20px', height: '20px', borderRadius: '5px 5px 0 0', marginRight: '5px' }} />
              <p>{item.projectName}</p>
            </div>
            <FaPlus />
          </div>
        </Card>
      ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter YouTube Video URL</DialogTitle>
        <DialogContent>
          <TextField
            label="Paste Your URLhere"
            variant="outlined"
            fullWidth
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DummyCards;
