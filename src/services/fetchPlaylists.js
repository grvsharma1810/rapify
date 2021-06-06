import axios from "axios";
import { API_URL } from "../config";

export const fetchPlaylists = async () => {
    try {
        const response = await axios.get(`${API_URL}/playlists`);
        console.log(response);
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