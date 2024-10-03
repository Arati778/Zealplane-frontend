import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from '@mui/material';
import axios from 'axios';

const ProjectModal = ({ visible, onCancel, onSave }) => {
  const [open, setOpen] = useState(visible); // Manage dialog state
  const [formData, setFormData] = useState({ projectName: '', passion: '', description: '' });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = async () => {
    try {
      // Add your logic to save the project data
      await onSave(formData);
      setFormData({ projectName: '', passion: '', description: '' }); // Clear form data
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCancel(); // Call onCancel prop when closing the dialog
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Project</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="projectName"
          label="Project Name"
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          select
          label="Passion"
          value={formData.passion}
          onChange={handleChange}
          name="passion"
          fullWidth
        >
          <MenuItem value="Arts & literature">Arts & literature</MenuItem>
          <MenuItem value="Coding">Coding</MenuItem>
          <MenuItem value="Beauty">Beauty</MenuItem>
        </TextField>
        <TextField
          id="description"
          label="Description"
          multiline
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleFormSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectModal;
