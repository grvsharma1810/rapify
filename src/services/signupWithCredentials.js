import axios from "axios";
import { API_URL } from "../config"

export const signupWithCredentials = async (userCredentials) => {
    try {
        const response = await axios.post(`${API_URL}/signup`,userCredentials)
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