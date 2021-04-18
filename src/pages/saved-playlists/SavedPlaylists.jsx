import './saved-playlists.css'
import {useData} from '../../data-context'


const SavedPlaylists = () => {

    const {dataState} = useData();

    return (
        <div>
            Saved Playlists
        </div>
    )
}

export default SavedPlaylists