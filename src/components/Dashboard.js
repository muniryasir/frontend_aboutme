import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Container, Box, Button, CircularProgress } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import axios from 'axios';
import { API_ADDRESS } from '../utils/config';


const Dashboard = () => {
  const [uniqueUrl, setUniqueUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [existingFeedback, setExistingFeedback] = useState(null);
  const [idUnique, setIDUnique] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const generateUniqueUrl = async () => {
        setLoading(true);
        try {
          const userId = sessionStorage.getItem('userId');
    
          const response = await axios.post(`${API_ADDRESS}/users/generate-Id`, { userId: userId });
          const uniqueId = response.data.uniqueId;
          const siteAddress = window.location.origin;
          setIDUnique(uniqueId);
          setUniqueUrl(`${siteAddress}/feedback/${uniqueId}`);
          return uniqueId;
        } catch (error) {
          console.error('Error generating unique URL:', error);
        } finally {
          setLoading(false);
        }
      };
  
      const id = await generateUniqueUrl();
  
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
  
      await fetchFeedback();
    };
  
    fetchData();
  }, []);
  



  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 2 }}>
        {/* <Typography variant="h4">Welcome to your dashboard!</Typography> */}
        {/* <Button variant="contained" color="primary" onClick={generateUniqueUrl} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Generate Unique URL'}
        </Button> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your Current AI Feedback:
          </Typography>
          {existingFeedback ? (
          <Typography variant="body1">{existingFeedback}</Typography>
        ) : (
          <Typography variant="body1">Loading feedback...</Typography>
        )}
        {uniqueUrl && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Your unique URL:</Typography>
            <Typography variant="body2" color="textSecondary">
              
              <a href={uniqueUrl} target="_blank" rel="noopener noreferrer">{uniqueUrl}</a>

            </Typography>

          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
