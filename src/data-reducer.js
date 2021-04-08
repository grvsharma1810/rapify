export const SET_INITIAL_STATE_LOADED_FROM_SERVER = 'setInitialState'


export const dataReducer = (state, { type, payload }) => {
    switch (type) {
        case SET_INITIAL_STATE_LOADED_FROM_SERVER:
            return {
                channel: payload.channel,
                allVideos: payload.allVideos,
                playlist: payload.playlist,
                liked: payload.liked,
                history: payload.history
            }

        default:
            return state;
    }
}