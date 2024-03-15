import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../axiosClient'; // Ensure this path matches your project structure

// Setup for FormData to work correctly with axiosClient for file uploads


// Async thunk for creating an account image
export const createAccountImage = createAsyncThunk(
    'accountImage/create',
    async (formData, { getState, rejectWithValue }) => {
        const token = getState().auth.user.access;
        try {
            const response = await axiosClient.post('account-images-view/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for retrieving account images
export const retrieveAccountImages = createAsyncThunk(
    'accountImage/retrieve',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.user.access; // Adjust based on your state structure
            const response = await axiosClient.get('account-images-view/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteAccountImage = createAsyncThunk(
    'accountImages/deleteAccountImage',
    async (imageId, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.user.access; // Get the user's access token
            await axiosClient.delete(`account-images-view/${imageId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return imageId; // Return the id of the deleted image
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const retrieveAccountImage = createAsyncThunk(
    'accountImages/retrieveAccountImage',
    async (imageId, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.user.access; // Get the user's access token
            const response = await axiosClient.get(`account-images-view/${imageId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Slice definition
export const accountImagesSlice = createSlice({
    name: 'accountImages',
    initialState: {
        images: [],
        isLoading: false,
        error: null,
        selectedImage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handling other actions...
            .addCase(retrieveAccountImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(retrieveAccountImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedImage = action.payload; // Store the retrieved image
            })
            .addCase(retrieveAccountImage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Assuming the error payload is structured appropriately
            })
            .addCase(deleteAccountImage.fulfilled, (state, action) => {
                // Remove the deleted image from the state
                state.images = state.images.filter(image => image.id !== action.payload);
            })
            // Handle pending and rejected cases as needed
            .addCase(deleteAccountImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAccountImage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Assuming the error payload is structured appropriately
            })
            .addCase(createAccountImage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAccountImage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.images.push(action.payload);
            })
            .addCase(createAccountImage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(retrieveAccountImages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(retrieveAccountImages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.images = action.payload;
            })
            .addCase(retrieveAccountImages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default accountImagesSlice.reducer;