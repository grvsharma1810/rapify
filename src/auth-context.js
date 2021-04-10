import { createContext, useState, useContext } from 'react';
import { getUserPlaylists } from './server/playlist-filters'
import { useData } from './data-context'
import { fakeAuthAPI } from './server/fakeAuthAPI'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAxios } from './useAxios'
import { SET_CURRENT_USER_DATA } from './data-reducer'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const { getData: getPlaylistData } = useAxios('/api/playlist')
    const { getData: getPlaylistVideoData } = useAxios('/api/playlistVideo')
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dataState, dataDispatch } = useData();
    const { state } = useLocation();
    const navigate = useNavigate();

    async function loginUserWithCredentials(email, password) {
        let user = null;
        try {
            setIsLoading(true);
            const response = await fakeAuthAPI(dataState.users, email, password);
            if (response.success) {
                user = response.body.user;
                const playlistData = await getPlaylistData();
                const playlistVideoData = await getPlaylistVideoData();
                try {
                    const playlist = getUserPlaylists(playlistData, playlistVideoData, user)
                    console.log("USER PLAYLISTS", playlist);
                    dataDispatch({
                        type: SET_CURRENT_USER_DATA,
                        payload: { playlist }
                    })
                }
                catch (error) {
                    console.error(error);
                    alert("Server Error Occurred");
                }
            }
        } catch (error) {
            console.error(error);
            alert("Either your email or password is wrong")
        } finally {
            setLoggedInUser(() => user);
            setIsLoading(false);
            navigate(state?.from ? state.from : "/");
        }
    }

    const logout = () => {
        setLoggedInUser(null);
        dataDispatch({
            type: SET_CURRENT_USER_DATA,
            payload: { playlist: [], liked: [], history: [], watchLater: [] }
        })
        navigate("/");
    }

    return (
        <AuthContext.Provider value={{ loggedInUser, loginUserWithCredentials, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)