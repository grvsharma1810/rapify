export const SET_ALL_VIDEOS_DATA = 'setAllVideosData'
export const SET_CURRENT_USER_DATA = 'setInitialState'
export const SET_ALL_USERS_DATA = 'setAllUsersData'
export const ADD_TO_HISTORY = 'addToHistory'

export const dataReducer = (state, { type, payload }) => {
    console.log({ state });
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

        default:
            return state;
    }
}