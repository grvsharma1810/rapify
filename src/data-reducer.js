export const SET_USER_PLAYLIST_DATA = 'setUserPlaylistData'
export const SET_ALL_USERS_DATA = 'setAllUsersData'
export const ADD_USER_VIDEO = 'addUserVideo'
export const ADD_TO_PLAYLIST_VIDEOS = 'addToPlaylistVideo'
export const REMOVE_FROM_PLAYLIST_VIDEOS = 'removeFromPlaylistVideo'
export const UPDATE_USER_VIDEO = 'updateUserVideo'

export const dataReducer = (state, { type, payload }) => {

    switch (type) {

        case SET_ALL_USERS_DATA:
            return {
                ...state,
                allUsers: payload.users
            }

        case SET_USER_PLAYLIST_DATA:
            return {
                ...state,
                userPlaylists: payload.playlists
            }

        case ADD_USER_VIDEO:
            return {
                ...state,
                allUsers: state.allUsers.map(user => user._id === payload.user._id ?
                    {
                        ...user,
                        videos: user.videos.concat(payload.video)
                    } : user)
            }

        case UPDATE_USER_VIDEO:
            return {
                ...state,
                allUsers: state.allUsers.map(user => user._id === payload.user._id ?
                    {
                        ...user,
                        videos: user.videos.map(video => video._id === payload.video._id ?
                            {
                                ...video,
                                [payload.key]: payload.value
                            } : video)
                    } : user)
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