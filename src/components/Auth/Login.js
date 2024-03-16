import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Alert, Container, Typography } from '@mui/material';
import {useAuth} from "../../hooks/useAuth";
import {useSelector} from "react-redux";

const Login = ({ onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {loginUser} = useAuth()
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        if (user) {
            onLoginSuccess(); // Only call this if user data is available
        }
    }, [user, onLoginSuccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        e.preventDefault();

        // Use loginUser from useAuth hook. Adapt this part to your Redux logic.
        loginUser(credentials)
            .catch((error) => {
                setError(error.response && error.response.data.error ? error.response.data.error : 'Invalid email or password.');
                setLoading(false);
            });



    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h5" style={{ textAlign: 'center', margin: '20px 0' }}>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    fullWidth
                    margin="normal"
                    value={credentials.email}
                    onChange={handleChange}
                    disabled={loading}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={credentials.password}
                    onChange={handleChange}
                    disabled={loading}
                />
                {error && <Alert severity="error" style={{ margin: '20px 0' }}>{error}</Alert>}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    style={{ margin: '20px 0' }}
                >
                    {loading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
            </form>
        </Container>
    );
};

export default Login;
