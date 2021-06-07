import { createContext, useState, useContext, useEffect } from 'react';
import { useData } from './DataProvider'
import { SET_USER_PLAYLIST_DATA } from './data-reducer'
import { useNavigate, useLocation } from 'react-router-dom'
import { signupWithCredentials } from '../services/signupWithCredentials';
import { loginWithCredentials } from '../services/loginWithCredentials';
import { fetchPlaylists } from '../services/fetchPlaylists';
import { setUpAuthHeaderForServiceCalls } from '../utils/setUpAuthHeaderForServiceCalls';
import { setUpAuthExceptionHandler } from '../utils/setUpAuthExceptionHandler';
import { loginWithGoogleService } from '../services/loginWithGoogleService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [loggedInUser, setLoggedInUser] = useState(null);
    const { dataDispatch } = useData();
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            const localStorageData = JSON.parse(localStorage.getItem("user"));
            if (localStorageData) {
                getAndSetUserData(localStorageData);
            }
        })()
    }, [])


    async function signup(userCredentials) {
        const data = await signupWithCredentials(userCredentials);
        if (data.success) {
            navigate("/login");
        }
    }

    async function getAndSetUserData(responseData) {
        setUpAuthHeaderForServiceCalls(responseData.token);
        setUpAuthExceptionHandler(logout, navigate);
        const { playlists } = await fetchPlaylists();
        console.log({ playlists })
        dataDispatch({ type: SET_USER_PLAYLIST_DATA, payload: { playlists } })
        setLoggedInUser(responseData.user);
        navigate(state?.from ? state.from : "/");
    }

    async function login(email, password) {
        const responseData = await loginWithCredentials(email, password);
        localStorage.setItem("user", JSON.stringify({ user: responseData.user, token: responseData.token }));
        getAndSetUserData(responseData);
    }

    async function googleLogin(tokenId) {
        const responseData = await loginWithGoogleService(tokenId);
        localStorage.setItem("user", JSON.stringify({ user: responseData.user, token: responseData.token }));
        getAndSetUserData(responseData);
    }

    const logout = () => {
        setLoggedInUser(null);
        dataDispatch({
            type: SET_USER_PLAYLIST_DATA,
            payload: { playlists: [] }
        })
        localStorage.removeItem("user");
        navigate("/");
    }

    const updateUserData = (updatedUser) => {
        setLoggedInUser(updatedUser);
    }

    return (
        <AuthContext.Provider value={{ loggedInUser, login, googleLogin, logout, signup, updateUserData }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)