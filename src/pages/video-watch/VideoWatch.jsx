import './video-watch.css'
import {useParams} from 'react-router-dom';
import {useData} from '../../data-context'
import {useAuth} from '../../auth-context'
import { useEffect, useState } from 'react';
import {useAxios} from '../../useAxios'
import {ADD_TO_HISTORY,
    ADD_TO_LIKED,
    ADD_TO_WATCH_LATER,
    INCREASE_LIKE_COUNT,
    DECREASE_LIKE_COUNT,
    REMOVE_FROM_LIKED
} from '../../data-reducer'

const getVideoDetails = (allVideos,videoId) =>{
    return allVideos.find(video => parseInt(video.id) === parseInt(videoId))
}

const getUserPlaylist = (allPlaylists,name) => {
    return allPlaylists.find(playlist =>{
        return playlist.name === name && playlist.type === 'default'
    })
}

const getUserPlaylistVideo = (allPlaylists,name,video) => {
    return allPlaylists.find(playlist =>{
        return playlist.name === name && playlist.type === 'default'
    }).videos
    .find(playlistVideo => parseInt(playlistVideo.parentVideo) === parseInt(video.id))
}

const isVideoLikedByUser = (video,likedVideosPlaylist,) => {    
    if(likedVideosPlaylist.videos.find(playlistVideo => {
        return parseInt(playlistVideo.parentVideo) === parseInt(video.id)
    })!==undefined){
        console.log("LIKED ALREADY",likedVideosPlaylist);
        return true;
    }
    return false;
}

const VideoWatch = () => {
    
    const [isLoading,setIsLoading] = useState(false)
    const {loggedInUser} = useAuth();
    const {videoId} = useParams();       
    const {dataState,dataDispatch}  = useData();
    const allVideos = dataState.allVideos;
    const video = getVideoDetails(allVideos,videoId)

    const {patchData:patchVideoData} = useAxios('/api/video')
    const {postData:postPlaylistVideoData,deleteData:deletePlaylistVideoData} = useAxios('/api/playlistVideo');
    useEffect(() => {
        if(loggedInUser){
            (async () => {
                const response = await postPlaylistVideoData({
                    parentVideo:videoId,
                    parentPlaylist: getUserPlaylist(dataState.playlist,'History').id,
                    viewedOn : new Date(),
                })
                dataDispatch({type:ADD_TO_HISTORY,payload:{video:response}})            
            })()
        }
    },[])    


    // Can be moved outside of component on refactoring
    const addToLikedVideos = async(setIsLoading) => {
        if(loggedInUser){
            setIsLoading(true);
            const response = await postPlaylistVideoData({
                parentVideo:videoId,
                parentPlaylist: getUserPlaylist(dataState.playlist,'Liked').id,
            })
            dataDispatch({type:ADD_TO_LIKED,payload:{video:response}})
            await patchVideoData({...video,likes:video.likes+1})
            dataDispatch({type:INCREASE_LIKE_COUNT,payload:{video}})
            setIsLoading(false);
        }        
    }

    // Can be moved outside of component on refactoring
    const removeFromLikedVideos = async(setIsLoading) => {
        if(loggedInUser){
            setIsLoading(true);
            await deletePlaylistVideoData(getUserPlaylistVideo(dataState.playlist,'Liked',video))
            dataDispatch({type:REMOVE_FROM_LIKED,payload:{video}})
            await patchVideoData({...video,likes:video.likes-1})
            dataDispatch({type:DECREASE_LIKE_COUNT,payload:{video}})
            setIsLoading(false);
        }        
    }

    return (
        <>
            <div className="video-container">            
                <iframe width="100%" height="300px" 
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
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
                                <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                <span> {video.likes}</span>
                            </div>                                                        
                        </button>
                    }
                    {
                        loggedInUser && !isVideoLikedByUser(video,getUserPlaylist(dataState.playlist,'Liked')) &&
                        <button 
                            onClick={() => addToLikedVideos(setIsLoading)} 
                            className="btn-solid secondary" disabled={isLoading}>
                            {
                                !isLoading &&
                                <div>
                                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                    <span> {video.likes}</span>
                                </div>
                            }
                            {
                                isLoading &&
                                <div className="small-spinner"></div>
                            }
                        </button>
                    }
                    {
                        loggedInUser && isVideoLikedByUser(video,getUserPlaylist(dataState.playlist,'Liked')) &&
                        <button 
                            onClick={() => removeFromLikedVideos(setIsLoading)} 
                            className="btn-solid secondary" disabled={isLoading}>
                            {
                                !isLoading &&
                                <div>
                                    <i className="fa fa-thumbs-up text-size-1"></i>
                                    <span> {video.likes}</span>
                                </div>
                            }
                            {
                                isLoading &&
                                <div className="small-spinner"></div>
                            }
                        </button>
                    }

                    <button className="btn-solid secondary">
                        <i className="fa fa-save text-size-1"></i>
                    </button>
                    <button className="btn-solid secondary">
                        <i className="fa fa-clock-o text-size-1"></i>
                    </button>
                </div>                
            </div>
        </>
    )
}

export default VideoWatch;