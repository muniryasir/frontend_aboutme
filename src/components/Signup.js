import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link, CircularProgress   } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ADDRESS } from '../utils/config';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
          }
        try {
          const response = await axios.post(`${API_ADDRESS}/users/signup`, { email, password, name });
          if (response.data.token) {
            const { token, userId } = response.data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userId', userId);
            navigate('/dashboard');
          } else {
            setError(response.data.message);
          }
        } catch (err) {
          setError(err.response.data.message);
        } finally {
          setLoading(false);
        }
      };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Sign Up</Typography>
            <form onSubmit={handleSignup}>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    
                    {loading ? <CircularProgress size={24} /> : 'Sign Up'}

                </Button>
            </form>
            <Typography>
                Already have an account? <Link component="button" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Login</Link>
            </Typography>
            
        </Container>
    );
};

export default Signup;
