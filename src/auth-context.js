import { createContext, useState, useContext } from 'react';
import { useData } from './data-context'
import { SET_ALL_USERS_DATA, SET_USER_PLAYLIST_DATA } from './data-reducer'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAxios } from './useAxios'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const { getData, postData, deleteData } = useAxios()
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dataDispatch } = useData();
    const { state } = useLocation();
    const navigate = useNavigate();


    async function signup(userCredentials) {
        setIsLoading(true)
        const { user } = await postData(`/users`, userCredentials);
        const { users } = await getData(`/users`);
        const { playlists } = await getData(`/users/${user._id}/playlists`);
        dataDispatch({ type: SET_ALL_USERS_DATA, payload: { users } })
        setLoggedInUser(user);
        dataDispatch({ type: SET_USER_PLAYLIST_DATA, payload: { playlists } })
        setIsLoading(false);
        navigate(state?.from ? state.from : "/");
    }


    async function login(email, password) {
        console.log({ email, password });
        setIsLoading(true);
        const { user } = await postData("/login", { email, password });
        console.log(user)
        const { playlists } = await getData(`/users/${user._id}/playlists`);
        setLoggedInUser(user);
        dataDispatch({ type: SET_USER_PLAYLIST_DATA, payload: { playlists } })
        setIsLoading(false);
        navigate(state?.from ? state.from : "/");
    }

    const logout = () => {
        setLoggedInUser(null);
        // dataDispatch({
        //     type: SET_CURRENT_USER_DATA,
        //     payload: { playlist: [], liked: [], history: [], watchLater: [] }
        // })
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{ loggedInUser, login, logout, signup, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)