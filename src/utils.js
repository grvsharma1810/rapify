import { ADD_TO_PLAYLIST_VIDEOS, REMOVE_FROM_PLAYLIST_VIDEOS } from './providers/data-reducer'

export const addToPlaylistVideos = async (loggedInUser, video, playlist, dataDispatch, postData) => {
    const data = {
        videoId: video._id,
        time: new Date()
    }
    const response = await postData(`/users/${loggedInUser._id}/playlists/${playlist._id}/videos`, data);
    dataDispatch({ type: ADD_TO_PLAYLIST_VIDEOS, payload: { playlist: playlist, playlistVideo: response.video } })
}

export const removeFromPlaylistVideos = async (loggedInUser, playlistVideo, playlist, dataDispatch, deleteData) => {
    await deleteData(`/users/${loggedInUser._id}/playlists/${playlist._id}/videos/${playlistVideo._id}`)
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