import axios from "axios"
import { API_URL } from "../config";

export const deleteVideoFromPlaylistService = async (playlistId,playlistVideoId) => {
    try {
        const response = await axios.delete(`${API_URL}/playlists/${playlistId}/videos/${playlistVideoId}`);
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