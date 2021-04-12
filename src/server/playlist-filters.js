/* Server's Work */
export const getUserPlaylists = (playlistData, playlistVideoData, user) => {
    return playlistData.filter(playlist => {
        return playlist.parentUser.toString() === user.id.toString()
    }).map(savedPlaylist => {
        return {
            ...savedPlaylist,
            videos: playlistVideoData.filter(playlistVideo => {
                return playlistVideo.parentPlaylist === savedPlaylist.id
            })
        }
    })
}