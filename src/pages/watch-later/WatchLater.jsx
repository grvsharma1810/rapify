import {useData} from '../../providers/DataProvider'
import {getUserPlaylist} from '../../utils'
import WatchLaterVideoCard from './components/watch-later-video-card/WatchLaterVideoCard'

const WatchLater = () => {

    const {dataState} = useData();        
    const watchLater = getUserPlaylist(dataState.userPlaylists,'Watch Later','default');

    return (
        <>
            <h4 className="text-size-2">Watch Later</h4>
            <div className="flex mt-1">
                {
                    watchLater?.videos.length === 0 &&
                    <p>No videos to watch later.</p>
                }
                {              
                    watchLater?.videos.length !== 0 &&
                    watchLater.videos.map((watchLaterVideo) => {
                        return <WatchLaterVideoCard watchLaterVideo={watchLaterVideo} key={watchLaterVideo._id} />
                    })
                }                
            </div>
        </>
    )
}

export default WatchLater;