export const SET_USER_PLAYLIST_DATA = 'setUserPlaylistData'
export const SET_ALL_VIDEOS_DATA = 'setAllVideosData'
export const ADD_USER_VIDEO = 'addUserVideo'
export const ADD_TO_PLAYLIST_VIDEOS = 'addToPlaylistVideo'
export const REMOVE_FROM_PLAYLIST_VIDEOS = 'removeFromPlaylistVideo'
export const UPDATE_USER_VIDEO = 'updateUserVideo'
export const ADD_TO_PLAYLIST = 'addToPlaylist'

export const dataReducer = (state, { type, payload }) => {

    switch (type) {

        case SET_ALL_VIDEOS_DATA:
            return {
                ...state,
                allVideos: payload.videos
            }

        case SET_USER_PLAYLIST_DATA:
            return {
                ...state,
                userPlaylists: payload.playlists
            }

        case ADD_USER_VIDEO:
            return {
                ...state,
                allVideos: state.allVideos.concat(payload.video)
            }

        case UPDATE_USER_VIDEO:
            return {
                ...state,                
                allVideos: state.allVideos.map(video => video._id === payload.video._id ?
                    {
                        ...video,
                        [payload.key]: payload.value
                    } : video)
                    
            }

        case ADD_TO_PLAYLIST:
            return {
                ...state,
                userPlaylists: state.userPlaylists.concat(payload.playlist)
            }

        case ADD_TO_PLAYLIST_VIDEOS:
            return {
                ...state,
                userPlaylists: state.userPlaylists.map(playlist => playlist._id === payload.playlist._id ?
                    {
                        ...playlist,
                        videos: playlist.videos.concat(payload.playlistVideo)
                    } : playlist)
            }

        case REMOVE_FROM_PLAYLIST_VIDEOS:
            return {
                ...state,
                userPlaylists: state.userPlaylists.map(playlist => playlist._id === payload.playlist._id ?
                    {
                        ...playlist,
                        videos: playlist.videos.filter(playlistVideo => playlistVideo._id !== payload.playlistVideo._id)
                    } : playlist)
            }

        default:
            return state;
    }
}