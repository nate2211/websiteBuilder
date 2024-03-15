import { useDispatch, useSelector } from 'react-redux';
import { login, logout, signup } from '../slices/auth'; // Adjust the import path as necessary

export function useAuth() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);

    const loginUser = (credentials) => {
        return dispatch(login(credentials)).unwrap();
    };

    const logoutUser = () => {
        dispatch(logout());
    };

    const signupUser = (userDetails) => {
        dispatch(signup(userDetails));
    };

    return {
        user,
        isLoggedIn,
        isLoading,
        error,
        loginUser,
        logoutUser,
        signupUser,
    };
}