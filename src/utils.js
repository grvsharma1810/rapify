import { ADD_TO_PLAYLIST_VIDEOS, REMOVE_FROM_PLAYLIST_VIDEOS } from './providers/data-reducer'
import { addVideoToPlaylistService } from './services/addVideoToPlaylistService';
import { deleteVideoFromPlaylistService } from './services/deleteVideoFromPlaylistService';

export const addToPlaylistVideos = async (video, playlist, dataDispatch) => {
    console.log({ video, playlist });
    const requestBody = {
        videoId: video._id,
        time: new Date()
    }
    const data = await addVideoToPlaylistService(playlist._id, requestBody);
    dataDispatch({ type: ADD_TO_PLAYLIST_VIDEOS, payload: { playlist: playlist, playlistVideo: data.video } })
}

export const removeFromPlaylistVideos = async (playlistVideo, playlist, dataDispatch) => {
    await deleteVideoFromPlaylistService(playlist._id, playlistVideo._id)
    dataDispatch({ type: REMOVE_FROM_PLAYLIST_VIDEOS, payload: { playlist: playlist, playlistVideo: playlistVideo } })
}

export const getVideoDetails = (allVideos, videoId) => {
    return allVideos.find(video => {
        return video._id === videoId
    })
}

export const getUserPlaylist = (userPlaylists, playlistName, type) => {
    return userPlaylists.find(playlist => {
        return playlist.name === playlistName && playlist.type === type;
    });
}

export const getUserPlaylistById = (userPlaylists, playlistId) => {
    return userPlaylists.find(playlist => {
        return playlist._id === playlistId;
    });
}

export const getUserPlaylistVideo = (video, playlist) => {
    return playlist.videos.find(playlistVideo => {
        return playlistVideo.videoId === video._id;
    })
}

export const isVideoPresentInPlaylistVideos = (video, playlist) => {
    return playlist.videos.find(playlistVideo => {
        return playlistVideo.videoId === video._id;
    }) !== undefined;
}

export const getRandomColor = () => {
    const color = ['red', 'green', 'yellow']
    return color[Math.floor(Math.random() * 3)];
}