import './saved-playlist-carousel.css';
import CarouselVideoCard from '../carousel-video-card/CarouselVideoCard'

const getVideoDetails = (allVideos,videoId) => {
    return allVideos.find(video => video.id.toString() === videoId.toString())
}

const SavedPlaylistCarousel = ({playlist, allUsers, allVideos}) => {

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
                            <CarouselVideoCard key={playlistVideo.id}
                            video={getVideoDetails(allVideos,playlistVideo.parentVideo)} allUsers={allUsers}/>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}

export default SavedPlaylistCarousel;