import { createContext, useState, useContext } from 'react';
import { useData } from './DataProvider'
import { SET_USER_PLAYLIST_DATA } from './data-reducer'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAxios } from './AxiosProvider'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const { getData, postData } = useAxios()
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dataDispatch } = useData();
    const { state } = useLocation();
    const navigate = useNavigate();


    async function signup(userCredentials) {
        setIsLoading(true)
        const response = await postData(`/users`, userCredentials);
        if (response.status === 400) {
            alert(response.data.errorMessage)
        } else {
            const user = response.user;
            const { playlists } = await getData(`/users/${user._id}/playlists`);
            dataDispatch({ type: SET_USER_PLAYLIST_DATA, payload: { playlists } })
            setLoggedInUser(user);
            navigate(state?.from ? state.from : "/");
        }
        setIsLoading(false);
    }


    async function login(email, password) {
        console.log({ email, password });
        setIsLoading(true);
        try {
            const { user } = await postData("/login", { email, password });
            const { playlists } = await getData(`/users/${user._id}/playlists`);
            console.log({ playlists });
            dataDispatch({ type: SET_USER_PLAYLIST_DATA, payload: { playlists } })
            setLoggedInUser(user);
            navigate(state?.from ? state.from : "/");
        } catch (error) {
            alert("Please enter a valid email and password");
        }
        setIsLoading(false);
    }

    const logout = () => {
        setLoggedInUser(null);
        dataDispatch({
            type: SET_USER_PLAYLIST_DATA,
            payload: { playlists: [] }
        })
        navigate("/");
    }

    const addToLoggedInUserVideos = (videoId) => {
        setLoggedInUser(loggedInUser => {
            return {
                ...loggedInUser,
                videos: loggedInUser.videos.concat(videoId)
            }
        })
    }

    const updateUserData = (updatedUser) => {
        setLoggedInUser(updatedUser);
    }

    return (
        <AuthContext.Provider value={{ loggedInUser, login, logout, signup, isLoading, addToLoggedInUserVideos, updateUserData }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)