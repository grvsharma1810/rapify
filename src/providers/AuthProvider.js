import { createContext, useState, useContext, useEffect } from 'react';
import { useData } from './DataProvider'
import { SET_USER_PLAYLIST_DATA } from './data-reducer'
import { useNavigate, useLocation } from 'react-router-dom'
import { signupWithCredentials } from '../services/signupWithCredentials';
import { loginWithCredentials } from '../services/loginWithCredentials';
import { fetchPlaylists } from '../services/fetchPlaylists';
import { setUpAuthHeaderForServiceCalls } from '../utils/setUpAuthHeaderForServiceCalls';
import { setUpAuthExceptionHandler } from '../utils/setUpAuthExceptionHandler';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dataDispatch } = useData();
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        (async function (){
            const localStorageData = JSON.parse(localStorage.getItem("user"));
            if(localStorageData){
                setIsLoading(true);
                setUpAuthHeaderForServiceCalls(localStorageData.token);
                setUpAuthExceptionHandler(logout, navigate);
                const { playlists } = await fetchPlaylists();
                dataDispatch({ type: SET_USER_PLAYLIST_DATA, payload: { playlists } })
                setLoggedInUser(localStorageData.user);
                setIsLoading(false);
            }    
        })()            
    },[])


    async function signup(userCredentials) {
        setIsLoading(true)
        const data = await signupWithCredentials(userCredentials);
        if (data.success) {
            navigate("/login");
        }
        setIsLoading(false);
    }

    async function login(email, password) {
        setIsLoading(true);
        const { user, token } = await loginWithCredentials(email, password);
        localStorage.setItem("user", JSON.stringify({ user, token }));
        setUpAuthHeaderForServiceCalls(token);
        setUpAuthExceptionHandler(logout, navigate);
        const { playlists } = await fetchPlaylists();
        dataDispatch({ type: SET_USER_PLAYLIST_DATA, payload: { playlists } })
        setLoggedInUser(user);
        navigate(state?.from ? state.from : "/");
        setIsLoading(false);
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

    // const addToLoggedInUserVideos = (videoId) => {
    //     setLoggedInUser(loggedInUser => {
    //         return {
    //             ...loggedInUser,
    //             videos: loggedInUser.videos.concat(videoId)
    //         }
    //     })
    // }

    const updateUserData = (updatedUser) => {
        setLoggedInUser(updatedUser);
    }

    return (
        <AuthContext.Provider value={{ loggedInUser, login, logout, signup, isLoading, updateUserData }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)