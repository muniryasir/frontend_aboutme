import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Container, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // Send feedback to backend
    fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setOpen(false);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Feedback
          </Typography>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Give Feedback
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Submit Feedback</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your feedback (up to 500 words).
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="feedback"
              label="Feedback"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              inputProps={{ maxLength: 500 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Feedback;
