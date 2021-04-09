/* Server's Work */
export const getDefaultPlaylistVideos = (playlistData, playlistVideoData, user, playlistName) => {
    return playlistVideoData.filter(playlistVideo => {
        return playlistData.find(playlist => {
            return playlist.parentUser === user.id
                && playlist.type === 'default'
                && playlist.name === playlistName
        }).id === playlistVideo.parentPlaylist
    })
}


export const getSavedPlaylists = (playlistData, playlistVideoData, user) => {
    return playlistData.filter(playlist => {
        return playlist.parentUser === user.id
            && playlist.type === 'user-created'
    }).map(savedPlaylist => {
        return {
            ...savedPlaylist,
            videos: playlistVideoData.filter(playlistVideo => {
                return playlistVideo.parentPlaylist === savedPlaylist.id
            })
        }
    })
}