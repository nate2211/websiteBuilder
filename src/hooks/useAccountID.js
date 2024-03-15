import { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from "react-redux";

const useAccountID = (accountId) => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                setLoading(true);

                if (!user.access) {
                    setError(new Error('No token found'));
                    setLoading(false);
                } else {
                    // Proceed with the fetch operation
                } // Retrieve the token from local storage
                const response = await axios.get(`http://127.0.0.1:8000/accounts/${accountId}/`, {
                    headers: {
                        'Authorization': `Bearer ${user.access}` // Include the token in the Authorization header
                    }
                });
                setAccount(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        if (accountId) { // Ensure accountId is present before fetching
            fetchAccount();
        }

        // Cleanup function
        return () => {
            // Any cleanup actions if needed
        };
    }, [accountId]); // Dependency array, effect runs when accountId changes

    return { account, loading, error };
};

export default useAccountID;