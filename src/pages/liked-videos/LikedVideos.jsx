import './liked-videos.css'
import {useData} from '../../providers/DataProvider'
import {getUserPlaylist} from '../../utils'
import LikedVideoCard from './components/liked-video-card/LikedVideoCard'

const LikedVideos = () => {

    const {dataState} = useData();
    const liked = getUserPlaylist(dataState.userPlaylists,'Liked','default');

    return (
        <>
            <h4 className="text-size-2">Your Liked Videos</h4>
            <div className="flex mt-1">
                {
                    liked?.videos.length === 0 &&
                    <p>No Video is Liked By You.</p>
                }
                {              
                    liked?.videos.length !== 0 &&
                    liked.videos.map((likedVideo) => {
                        return <LikedVideoCard likedVideo={likedVideo} key={likedVideo._id} />
                    })
                }                
            </div>
        </>
    )
}

export default LikedVideos;