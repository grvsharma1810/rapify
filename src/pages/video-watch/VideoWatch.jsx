import './video-watch.css'

import {useParams} from 'react-router-dom';
import {useData} from '../../data-context'
import {useAuth} from '../../auth-context'

const getVideoDetails = (allUsers,videoId) =>{
    for(const user of allUsers){
        console.log({user});
        const video = user.videos.find(video => video._id === videoId)
        if(video){
            return video;
        }
        else{
            continue;
        }
    }    
}

const getYouTubeId = (youtubeUrl) => {
    return youtubeUrl.split("?v=")[1];
}

const VideoWatch = () => {

    const {videoId} = useParams();       
    const {dataState,dataDispatch,isInitialAppDataLoading}  = useData();
    const {loggedInUser} = useAuth();
    const allUsers = dataState.allUsers;
    const video = getVideoDetails(allUsers,videoId)    
    
    return (
        <>                   
            <div className="video-container">            
                <iframe width="100%" height="300px" 
                src={`https://www.youtube.com/embed/${getYouTubeId(video.youtubeUrl)}`}
                title="YouTube video player" 
                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen></iframe>
            </div>        
            <div className="flex space-btw v-center mt-1">
                <div className="text-size-sm">
                    <p>View Count Coming Soon <br/> (Under Construction)</p>
                </div>
                <div className="flex flex-gap-sm">
                    {
                        !loggedInUser &&
                        <button 
                            onClick={() => alert("Please login to like the video.")} 
                            className="btn-solid secondary">                                                            
                            <div>
                                <i className="fa fa-thumbs-o-up"></i>
                                <span> {video.likes}</span>
                            </div>                                                        
                        </button>
                    }
                    {/* {
                        loggedInUser && !isVideoPresentInPlaylistVideos(video,getUserPlaylist(dataState.playlist,'Liked')) &&
                        <button 
                            onClick={() => addToLikedVideos(setIsLikedLoading)} 
                            className="btn-solid secondary" disabled={isLikedLoading}>
                            {
                                !isLikedLoading &&
                                <div>
                                    <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                    <span> {video.likes}</span>
                                </div>
                            }
                            {
                                isLikedLoading &&
                                <div className="small-spinner"></div>
                            }
                        </button>
                    }
                    {
                        loggedInUser && isVideoPresentInPlaylistVideos(video,getUserPlaylist(dataState.playlist,'Liked')) &&
                        <button 
                            onClick={() => removeFromLikedVideos(setIsLikedLoading)} 
                            className="btn-solid secondary" disabled={isLikedLoading}>
                            {
                                !isLikedLoading &&
                                <div>
                                    <i className="fa fa-thumbs-o-up text-primary" aria-hidden="true"></i>
                                    <span> {video.likes}</span>
                                </div>
                            }
                            {
                                isLikedLoading &&
                                <div className="small-spinner"></div>
                            }
                        </button>
                    } */}



                </div>
            </div>
        </>
    )
}

export default VideoWatch;