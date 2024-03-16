import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Alert } from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '', // Optional
        lastName: '', // Optional
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [signupError, setSignupError] = useState('');
    const [touched, setTouched] = useState({
        password: false,
        confirmPassword: false, // Track if confirmPassword field has been touched
    });
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate()
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const {signupUser} = useAuth()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'confirmPassword' && value === '') {
            setConfirmPasswordError('');
        }
        // Mark the field as touched once the user starts typing
        if (name === 'password' || name === 'confirmPassword') {
            setTouched({ ...touched, [name]: true });
        }

        // Validate password strength only after the user starts typing in the password field
        if (name === 'password') {
            if (touched.password && !strongPasswordRegex.test(value)) {
                setErrors({
                    ...errors,
                    password: 'Password must be at least 8 characters long and include at least one letter and one number.',
                });
            } else {
                const newErrors = { ...errors };
                delete newErrors.password;
                setErrors(newErrors);
            }
        }

        // Check if passwords match only if both fields have been touched
        if ((name === 'password' || name === 'confirmPassword') && touched.confirmPassword) {
            if (formData.confirmPassword !== value && name === 'password') {
                setErrors({ ...errors, confirmPassword: 'Passwords do not match.' });
            } else if (formData.password !== formData.confirmPassword && name === 'confirmPassword') {
                setErrors({ ...errors, confirmPassword: 'Passwords do not match.' });
            } else {
                const newErrors = { ...errors };
                delete newErrors.confirmPassword;
                setErrors(newErrors);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSignupSuccess(false);
        setSignupError('');

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            setIsSubmitting(false);
            return;
        }

        // Remove confirmPassword from formData before submitting
        const { confirmPassword, ...submitFormData } = formData;

        signupUser(formData)
            .then(() => {
                setSignupSuccess(true);
                navigate('/') // Handle successful login if needed
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data);
                } else {
                    setSignupError('Failed to signup. Please try again.');
                }
            }).finally(() => {setIsSubmitting(false)});


    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Username"
                variant="outlined"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.username}
                helperText={errors.username}
            />
            <TextField
                label="First Name (Optional)"
                variant="outlined"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Last Name (Optional)"
                variant="outlined"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
            />

            <TextField
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => setTouched({ ...touched, password: true })} // Mark as touched on blur
                fullWidth
                margin="normal"
                error={!!errors.password && touched.password}
                helperText={touched.password && errors.password ? errors.password : ''}
            />
            <TextField
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
            />
            {signupError && <Alert severity="error">{signupError}</Alert>}
            {signupSuccess && <Alert severity="success">Signup successful!</Alert>}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 2 }}
            >
                {isSubmitting ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
        </form>
    );
}

export default Signup;

