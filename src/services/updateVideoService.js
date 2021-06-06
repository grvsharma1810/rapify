import axios from "axios";
import { API_URL } from "../config";

export const updateVideoService = async (videoId,requestBody) => {
    try {
        const response = await axios.post(`${API_URL}/videos/${videoId}`, requestBody);
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