import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Container, Box, Button, CircularProgress } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import axios from 'axios';
import { API_ADDRESS } from '../utils/config';


const Dashboard = () => {
  const [uniqueUrl, setUniqueUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateUniqueUrl = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_ADDRESS}/users/generate-id`, { userId: 'dummyUserId' });
      const uniqueId = response.data.uniqueId;
      const siteAddress = window.location.origin;
      setUniqueUrl(`${siteAddress}/feedback/${uniqueId}`);
    } catch (error) {
      console.error('Error generating unique URL:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <Typography variant="h4">Welcome to your dashboard!</Typography>
        <Button variant="contained" color="primary" onClick={generateUniqueUrl} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Generate Unique URL'}
        </Button>
        {uniqueUrl && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">Your unique URL:</Typography>
            <Typography variant="body2" color="textSecondary">{uniqueUrl}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
