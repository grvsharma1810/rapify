import './saved-playlists.css'
import {useData} from '../../data-context'
import SavedPlaylistCarousel from './components/saved-playlist-carousel/SavedPlaylistCarousel'

const getUserCreatedPlaylists = (allPlaylists) => {
    return allPlaylists.filter(playlist => playlist.type === 'user-created')
}


const SavedPlaylists = () => {

    const {dataState} = useData();
    const playlist = dataState.playlist

    return (
        <div>            
            {
                getUserCreatedPlaylists(playlist).map(playlist => {
                    return (
                        <SavedPlaylistCarousel key={playlist.keys} 
                            playlist={playlist}
                            allVideos={dataState.allVideos}
                            allUsers={dataState.users}
                        />
                    )
                })
            }
        </div>
    )
}

export default SavedPlaylists