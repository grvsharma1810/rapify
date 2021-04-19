import './saved-playlist-carousel.css';
import CarouselVideoCard from '../carousel-video-card/CarouselVideoCard'
import {getVideoDetails} from '../../../../utils'

const SavedPlaylistCarousel = ({playlist, allVideos}) => {

    return (
        <>
            <h4 className="text-size-2 mb-1">{playlist.name}</h4>
            <div className="carousel mb-2">            
                {
                    playlist.videos.length === 0 && 
                    <p>No videos are present in this playlist.</p>
                }
                {
                    playlist.videos.length !==0 && 
                    playlist.videos.map(playlistVideo => {
                        return (
                            <div>
                                <CarouselVideoCard key={playlistVideo._id}
                                video={getVideoDetails(allVideos,playlistVideo.videoId)}/>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default SavedPlaylistCarousel;