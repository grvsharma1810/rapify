import './video-watch.css'
import {useParams} from 'react-router-dom';
import {useData} from '../../data-context'

const getVideoDetails = (allVideos,videoId) =>{
    return allVideos.find(video => parseInt(video.id) === parseInt(videoId))
}

const VideoWatch = () => {

    const {videoId} = useParams();       
    const {dataState}  = useData();
    const allVideos = dataState.allVideos;

    return (
        <div className="video-container">            
            <iframe width="100%" height="300px" 
            src={`https://www.youtube.com/embed/${getVideoDetails(allVideos,videoId).youtubeId}`}
            title="YouTube video player" 
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen></iframe>
        </div>
    )
}

export default VideoWatch;