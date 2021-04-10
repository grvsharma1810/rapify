import './video-watch.css'
import {useParams} from 'react-router-dom';
import {useData} from '../../data-context'
import {useAuth} from '../../auth-context'
import { useEffect } from 'react';
import {useAxios} from '../../useAxios'
import {ADD_TO_HISTORY} from '../../data-reducer'

const getVideoDetails = (allVideos,videoId) =>{
    return allVideos.find(video => parseInt(video.id) === parseInt(videoId))
}

const getUserHistoryPlaylist = (allPlaylists) => {
    return allPlaylists.find(playlist =>{
        return playlist.name === 'History' && playlist.type === 'default'
    })
}

const VideoWatch = () => {
    
    const {loggedInUser} = useAuth();
    const {videoId} = useParams();       
    const {dataState,dataDispatch}  = useData();
    const allVideos = dataState.allVideos;

    const {postData} = useAxios('/api/playlistVideo');
    useEffect(() => {
        if(loggedInUser){
            (async () => {
                const response = await postData({
                    parentVideo:videoId,
                    parentPlaylist: getUserHistoryPlaylist(dataState.playlist).id,
                    viewedOn : new Date(),
                })
                dataDispatch({type:ADD_TO_HISTORY,payload:{video:response}})            
            })()
        }
    },[])

    return (
        <>
            <div className="video-container">            
                <iframe width="100%" height="300px" 
                src={`https://www.youtube.com/embed/${getVideoDetails(allVideos,videoId).youtubeId}`}
                title="YouTube video player" 
                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen></iframe>
            </div>
            <div className="flex flex-gap-0">

            </div>
        </>
    )
}

export default VideoWatch;