// src/components/HeroBanner.js

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroBanner = () => {
  return (
    <Box
      sx={{
        backgroundImage: 'url(https://cdn.marvel.com/content/1x/xmen-fromtheashes-stegmanteaser-v2_resized.jpg)', // Replace with your image URL
        backgroundSize: 'cover',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Explore Amazing Comics
      </Typography>
      <Typography variant="h5" gutterBottom>
        Dive into the world of thrilling stories and captivating art
      </Typography>
      <Button variant="contained" color="primary">
        Start Reading
      </Button>
    </Box>
  );
};

export default HeroBanner;
