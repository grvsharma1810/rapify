export const SET_ALL_VIDEOS_DATA = 'setAllVideosData'
export const SET_CURRENT_USER_DATA = 'setInitialState'
export const SET_ALL_USERS_DATA = 'setAllUsersData'
export const ADD_TO_HISTORY = 'addToHistory'
export const ADD_TO_LIKED = 'addToLiked'
export const ADD_TO_WATCH_LATER = 'addToWatchLater'
export const INCREASE_LIKE_COUNT = 'increaseLikeCount'
export const DECREASE_LIKE_COUNT = 'decreaseLikeCount'
export const REMOVE_FROM_LIKED = 'removeFromLiked'
export const REMOVE_FROM_WATCH_LATER = 'removeFromWatchLater'
export const ADD_TO_PLAYLIST = 'addToPlaylist'
export const ADD_TO_PLAYLIST_VIDEO = 'addToPlaylistVideo'
export const REMOVE_FROM_PLAYLIST_VIDEO = 'removeFromPlaylistVideo'

export const dataReducer = (state, { type, payload }) => {
    // console.log({ state });
    switch (type) {
        case SET_ALL_VIDEOS_DATA:
            return {
                ...state,
                allVideos: payload.allVideos
            }

        case SET_ALL_USERS_DATA:
            return {
                ...state,
                users: payload.users
            }

        case SET_CURRENT_USER_DATA:
            return {
                ...state,
                playlist: payload.playlist,
            }

        case ADD_TO_PLAYLIST:
            return {
                ...state,
                playlist: state.playlist.concat(payload.newPlaylist)
            }

        case ADD_TO_PLAYLIST_VIDEO:
            return {
                ...state,
                playlist: state.playlist.map(playlist => {
                    if (playlist.name.toLowerCase() === payload.playlist.name.toLowerCase() && playlist.type === payload.playlist.type.toLowerCase()) {
                        return { ...playlist, videos: playlist.videos.concat(payload.video) }
                    }
                    return { ...playlist };
                })
            }

        case REMOVE_FROM_PLAYLIST_VIDEO:
            return {
                ...state,
                playlist: state.playlist.map(playlist => {
                    if (playlist.name.toLowerCase() === payload.playlist.name.toLowerCase() && playlist.type === payload.playlist.type.toLowerCase()) {
                        return {
                            ...playlist,
                            videos: playlist.videos.filter(playlistVideo => {
                                if (playlistVideo.parentVideo.toString() === payload.video.id.toString()) {
                                    return false;
                                }
                                return true;
                            })
                        }
                    }
                    return { ...playlist };
                })
            }

        case ADD_TO_HISTORY:
            return {
                ...state,
                playlist: state.playlist.map(playlist => {
                    if (playlist.name === 'History' && playlist.type === 'default') {
                        return { ...playlist, videos: playlist.videos.concat(payload.video) }
                    }
                    return { ...playlist };
                })
            }

        case ADD_TO_LIKED:
            return {
                ...state,
                playlist: state.playlist.map(playlist => {
                    if (playlist.name === 'Liked' && playlist.type === 'default') {
                        return { ...playlist, videos: playlist.videos.concat(payload.video) }
                    }
                    return { ...playlist };
                })
            }

        case ADD_TO_WATCH_LATER:
            return {
                ...state,
                playlist: state.playlist.map(playlist => {
                    if (playlist.name === 'Watch Later' && playlist.type === 'default') {
                        return { ...playlist, videos: playlist.videos.concat(payload.video) }
                    }
                    return { ...playlist };
                })
            }

        case INCREASE_LIKE_COUNT:
            return {
                ...state,
                allVideos: state.allVideos.map(video => {
                    if (video.id.toString() === payload.video.id.toString()) {

                        return { ...video, likes: video.likes + 1 }
                    }
                    return { ...video };
                })
            }

        case DECREASE_LIKE_COUNT:
            return {
                ...state,
                allVideos: state.allVideos.map(video => {
                    if (video.id.toString() === payload.video.id.toString()) {

                        return { ...video, likes: video.likes - 1 }
                    }
                    return { ...video };
                })
            }

        case REMOVE_FROM_LIKED:
            return {
                ...state,
                playlist: state.playlist.map(playlist => {
                    if (playlist.name === 'Liked' && playlist.type === 'default') {
                        return {
                            ...playlist,
                            videos: playlist.videos.filter(playlistVideo => {
                                if (playlistVideo.parentVideo.toString() === payload.video.id.toString()) {
                                    return false;
                                }
                                return true;
                            })
                        }
                    }
                    return { ...playlist };
                })
            }

        case REMOVE_FROM_WATCH_LATER:
            return {
                ...state,
                playlist: state.playlist.map(playlist => {
                    if (playlist.name === 'Watch Later' && playlist.type === 'default') {
                        return {
                            ...playlist,
                            videos: playlist.videos.filter(playlistVideo => {
                                if (playlistVideo.parentVideo.toString() === payload.video.id.toString()) {
                                    return false;
                                }
                                return true;
                            })
                        }
                    }
                    return { ...playlist };
                })
            }

        default:
            return state;
    }
}