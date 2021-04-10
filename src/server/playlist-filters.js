/* Server's Work */
export const getUserPlaylists = (playlistData, playlistVideoData, user) => {
    return playlistData.filter(playlist => {
        return parseInt(playlist.parentUser) === parseInt(user.id)
    }).map(savedPlaylist => {
        return {
            ...savedPlaylist,
            videos: playlistVideoData.filter(playlistVideo => {
                return playlistVideo.parentPlaylist === savedPlaylist.id
            })
        }
    })
}