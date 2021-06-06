import axios from "axios";
import { API_URL } from "../config"

export const loginWithCredentials = async (email,password) => {
    try {
        const response = await axios.post(`${API_URL}/login`,{email,password})
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert(error.response.data.message);
            return [];
        }
        alert("Something Went Wrong");
        return [];
    }
}