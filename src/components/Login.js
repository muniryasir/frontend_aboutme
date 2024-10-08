import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link, CircularProgress   } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ADDRESS } from '../utils/config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) {
          setError('Please fill in all fields.');
          return;
        }
        try {
          const response = await axios.post(`${API_ADDRESS}/users/login`, { email, password });
          console.log(response)
          if (response.data.token) {
            const { token, userId } = response.data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userId', userId);
            navigate('/dashboard');
          } else {
            setError(response.data.message);
          }
        } catch (err) {
          console.log(err)
          setError(err.response.data.message);
        } finally {
          setLoading(false);
        }
      };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={handleLogin}>
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
                    
                    {loading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
            </form>
            <Typography>
                Don't have an account? <Link onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>Sign Up</Link>
            </Typography>
        </Container>
    );
};

export default Login;
