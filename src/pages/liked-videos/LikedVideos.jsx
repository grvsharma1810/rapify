import './liked-videos.css'
import {useData} from '../../data-context'
import LikedVideoCard from './components/liked-video-card/LikedVideoCard'

const LikedVideos = () => {

    const {dataState} = useData();    
    const liked = dataState.playlist.find(playlist => {
        return playlist.name === 'Liked' && playlist.type === 'default';
    });

    return (
        <>
            <h4 className="text-size-2">Your Liked Videos</h4>
            <div className="flex mt-1">
                {
                    liked?.videos.length == 0 &&
                    <p>No Video is Liked By You.</p>
                }
                {              
                    liked?.videos.length !== 0 &&
                    liked.videos.map((likedVideo) => {
                        return <LikedVideoCard likedVideo={likedVideo} key={likedVideo.id} />
                    })
                }                
            </div>
        </>
    )
}

export default LikedVideos;