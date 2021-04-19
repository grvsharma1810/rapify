import './saved-playlists.css'
import {useData} from '../../providers/DataProvider'
import SavedPlaylistCarousel from './components/saved-playlist-carousel/SavedPlaylistCarousel'

const getUserCreatedPlaylists = (allPlaylists) => {
    return allPlaylists.filter(playlist => playlist.type === 'user-created')
}

const SavedPlaylists = () => {

    const {dataState} = useData();
    const userCreatedPlaylists = getUserCreatedPlaylists(dataState.userPlaylists);
    console.log({userCreatedPlaylists})

    return (
        <div>
             {
                userCreatedPlaylists.length === 0 &&
                <p>No saved playlist found.</p>
            }            
            {
                userCreatedPlaylists.length !== 0 &&
                userCreatedPlaylists.map(playlist => {
                    return (
                        <SavedPlaylistCarousel key={playlist._id} 
                            playlist={playlist}
                            allVideos={dataState.allVideos}                            
                        />
                    )
                })
            }
        </div>
    )
}

export default SavedPlaylists