import axios from "axios";
import { API_URL } from "../config";

export const updateUserService = async (userId, requestBody) => {
    try {
        const response = await axios.post(`${API_URL}/users/${userId}`, requestBody);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            alert("Internal Server Error");
            return error.response.data.message;
        }
        alert("Something went wrong");
        return error.response.data.message;
    }
}