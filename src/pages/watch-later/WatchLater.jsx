import {useData} from '../../data-context'
import WatchLaterVideoCard from './components/watch-later-video-card/WatchLaterVideoCard'

const WatchLater = () => {
    const {dataState} = useData();    
    const watchLater = dataState.playlist.find(playlist => {
        return playlist.name === 'Watch Later' && playlist.type === 'default';
    });

    return (
        <>
            <h4 className="text-size-2">Watch Later</h4>
            <div className="flex mt-1">
                {
                    watchLater?.videos.length == 0 &&
                    <p>Playlist is empty.</p>
                }
                {              
                    watchLater?.videos.length !== 0 &&
                    watchLater.videos.map((watchLaterVideo) => {
                        return <WatchLaterVideoCard watchLaterVideo={watchLaterVideo} key={watchLaterVideo.id} />
                    })
                }                
            </div>
        </>
    )
}

export default WatchLater;