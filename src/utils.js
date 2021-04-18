import { ADD_TO_PLAYLIST_VIDEOS, REMOVE_FROM_PLAYLIST_VIDEOS } from './data-reducer'

export const addToPlaylistVideos = async (loggedInUser, video, playlist, dataDispatch, postData) => {
    const data = {
        videoId: video._id,
        time: new Date()
    }
    const response = await postData(`/users/${loggedInUser._id}/playlists/${playlist._id}/videos`, data);
    dataDispatch({ type: ADD_TO_PLAYLIST_VIDEOS, payload: { playlist: playlist, playlistVideo: response.video } })
}

export const removeFromPlaylistVideos = async (loggedInUser, playlistVideo, playlist, dataDispatch, deleteData) => {
    const response = await deleteData(`/users/${loggedInUser._id}/playlists/${playlist._id}/videos/${playlistVideo._id}`)
    dataDispatch({ type: REMOVE_FROM_PLAYLIST_VIDEOS, payload: { playlist: playlist, playlistVideo: playlistVideo } })
}