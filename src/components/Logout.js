import React from 'react';
import { Button } from '@mui/material';
import { useAuth } from "../hooks/useAuth"; // Adjust the path as necessary
import { persistor } from '../store'; // Adjust the path to your store configuration

export default function Logout(){
    const { logoutUser } = useAuth();

    const handleLogout = () => {
        logoutUser(); // Dispatch the logout action
        persistor.purge() // Optionally clear the persisted state
            .then(() => {
                console.log('Logout successful and persistence store purged.');
                // Here you can also redirect the user to the login page or perform other actions as needed
            });
    };

    return (
        <Button onClick={handleLogout} color="inherit">
            Logout
        </Button>
    );
};