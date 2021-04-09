import { createContext, useState, useContext } from 'react';
import { useData } from './data-context'
import { fakeAuthAPI } from './fakeAuthAPI'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAxios } from './useAxios'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    // const {getData:}
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dataState } = useData();
    const { state } = useLocation();
    const navigate = useNavigate();

    async function loginUserWithCredentials(email, password) {
        try {
            setIsLoading(true);
            const response = await fakeAuthAPI(dataState.users, email, password);
            if (response.success) {
                setLoggedInUser(response.body.user);
                navigate(state?.from ? state.from : "/");
            }
        } catch (error) {
            alert("Either your email or password is wrong")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ loggedInUser, loginUserWithCredentials, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)