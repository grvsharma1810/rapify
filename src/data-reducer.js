export const SET_ALL_VIDEOS_DATA = 'setAllVideosData'
export const SET_USER_DATA_LOADED_FROM_SERVER = 'setInitialState'
export const SET_ALL_USERS_DATA = 'setAllUsersData'


export const dataReducer = (state, { type, payload }) => {
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

        case SET_USER_DATA_LOADED_FROM_SERVER:
            return {
                playlist: payload.playlist,
                liked: payload.liked,
                history: payload.history,
                watchLater: payload.watchLater,
            }

        default:
            return state;
    }
}