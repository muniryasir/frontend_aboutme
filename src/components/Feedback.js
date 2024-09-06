import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Container, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ADDRESS } from '../utils/config';

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [existingFeedback, setExistingFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${API_ADDRESS}/users/aifeedback/${id}`);
        if (response.data.feedback) {
          setExistingFeedback(response.data.feedback);
        } else {
          setExistingFeedback('Feedback not available yet.');
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setExistingFeedback('Error fetching feedback.');
      }
    };

    fetchFeedback();
  }, [id]);

  const handleClickOpen = () => {
    console.log(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e)  => {
    // Send feedback to backend
    // event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${API_ADDRESS}/users/feedback`, { uniqueId:id, feedback });
      setMessage('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Failed to submit feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Feedback
          </Typography>
          {/* <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar> */}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 2 }}>
      {existingFeedback ? (
          <Typography variant="body1">{existingFeedback}</Typography>
        ) : (
          <Typography variant="body1">Loading feedback...</Typography>
        )}
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
            {/* <Button onClick={handleSubmit}>Submit</Button> */}
            <Button  onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Feedback;
