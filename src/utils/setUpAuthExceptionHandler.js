import axios from "axios";

export const setUpAuthExceptionHandler = (signOutUser,navigate) => {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error?.response?.status === UNAUTHORIZED) {
                signOutUser();
                navigate("login");
            }
            return Promise.reject(error);
        }
    );
}