// src/components/ComicCard.js

import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const ComicCard = ({ title, image, description }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Button size="small" color="primary">
        Read More
      </Button>
    </Card>
  );
};

export default ComicCard;
