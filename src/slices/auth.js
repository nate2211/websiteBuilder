import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../axiosClient'; // Adjust the import path to your axiosClient setup

// Async thunk for signup
export const signup = createAsyncThunk('/signup/', async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosClient.post('/signup/', userData);
        // Assuming the API returns access, refresh tokens, and user info on successful signup
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for login
export const login = createAsyncThunk('/login/', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axiosClient.post('/login/', credentials);
        // Assuming the API returns access, refresh tokens, and user info on successful login
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Async thunk for logout
export const logout = createAsyncThunk('/logout/', async (_, { rejectWithValue }) => {
    try {
        // Perform logout operations, if any (like invalidating tokens on the backend)
        return {};
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload; // Assuming payload contains user data
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export default authSlice.reducer;