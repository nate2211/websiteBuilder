import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createAccountImage,
    retrieveAccountImages,
    retrieveAccountImage,
    deleteAccountImage,
} from '../slices/accountimages';


export function useAccountImages() {
    const dispatch = useDispatch();
    const { images, selectedImage, isLoading, error } = useSelector((state) => state.accountImages);

    const fetchImages = useCallback(() => {
        dispatch(retrieveAccountImages());
    }, [dispatch]);

    const retrieveImage = useCallback((imageId) => {
        dispatch(retrieveAccountImage(imageId));
    }, [dispatch]);

    const deleteImage = useCallback((imageId) => {
        dispatch(deleteAccountImage(imageId));
    }, [dispatch]);

    const uploadImage = useCallback((formData) => {
        dispatch(createAccountImage(formData));
    }, [dispatch]);

    return {
        images,
        selectedImage,
        isLoading,
        error,
        fetchImages,
        retrieveImage,
        deleteImage,
        uploadImage,
    };
}