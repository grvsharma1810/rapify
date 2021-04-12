import './video-watch.css'
import {useParams} from 'react-router-dom';
import {useData} from '../../data-context'
import {useAuth} from '../../auth-context'
import { useEffect, useState, useRef } from 'react';
import {useAxios} from '../../useAxios'

import Spinner from '../../shared-components/spinner/Spinner'
import PlaylistModal from './components/playlist-modal/PlaylistModal'
import {ADD_TO_HISTORY,
    ADD_TO_LIKED,
    ADD_TO_WATCH_LATER,
    INCREASE_LIKE_COUNT,
    DECREASE_LIKE_COUNT,
    REMOVE_FROM_LIKED,
    REMOVE_FROM_WATCH_LATER
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

const isVideoPresentInPlaylistVideos = (video,likedVideosPlaylist) => {    
    if(likedVideosPlaylist.videos.find(playlistVideo => {
        return parseInt(playlistVideo.parentVideo) === parseInt(video.id)
    })!==undefined){
        console.log("LIKED ALREADY",likedVideosPlaylist);
        return true;
    }
    return false;
}

const VideoWatch = () => {
    
    const playlistModalRef = useRef(null);
    const [isLikedLoading,setIsLikedLoading] = useState(false)
    const [isWatchLaterLoading,setIsWatchLaterLoading] = useState(false)
    const {loggedInUser} = useAuth();
    const {videoId} = useParams();       
    const {dataState,dataDispatch,isInitialAppDataLoading,initialDataLoad}  = useData();
    const allVideos = dataState.allVideos;
    const video = getVideoDetails(allVideos,videoId)

    const {patchData:patchVideoData} = useAxios('/api/video')
    const {postData:postPlaylistVideoData,deleteData:deletePlaylistVideoData} = useAxios('/api/playlistVideo');
    
    useEffect(() => {        
        // initialDataLoad();          
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
    const addToLikedVideos = async(setIsLikedLoading) => {
        if(loggedInUser){
            setIsLikedLoading(true);
            const response = await postPlaylistVideoData({
                parentVideo:videoId,
                parentPlaylist: getUserPlaylist(dataState.playlist,'Liked').id,
            })
            dataDispatch({type:ADD_TO_LIKED,payload:{video:response}})
            await patchVideoData({...video,likes:video.likes+1})
            dataDispatch({type:INCREASE_LIKE_COUNT,payload:{video}})
            setIsLikedLoading(false);
        }        
    }

    // Can be moved outside of component on refactoring
    const removeFromLikedVideos = async(setIsLikedLoading) => {
        if(loggedInUser){
            setIsLikedLoading(true);
            await deletePlaylistVideoData(getUserPlaylistVideo(dataState.playlist,'Liked',video))
            dataDispatch({type:REMOVE_FROM_LIKED,payload:{video}})
            await patchVideoData({...video,likes:video.likes-1})
            dataDispatch({type:DECREASE_LIKE_COUNT,payload:{video}})
            setIsLikedLoading(false);
        }        
    }

    // Can be moved outside of component on refactoring
    const addToWatchLater = async(setIsWatchLaterLoading) => {
        if(loggedInUser){
            setIsWatchLaterLoading(true);
            const response = await postPlaylistVideoData({
                parentVideo:videoId,
                parentPlaylist: getUserPlaylist(dataState.playlist,'Watch Later').id,
            })
            dataDispatch({type:ADD_TO_WATCH_LATER,payload:{video:response}})                        
            setIsWatchLaterLoading(false);
        }
    }

    // Can be moved outside of component on refactoring
    const removeFromWatchLater = async(setIsWatchLaterLoading) => {
        setIsWatchLaterLoading(true);
        await deletePlaylistVideoData(getUserPlaylistVideo(dataState.playlist,'Watch Later',video))
        dataDispatch({type:REMOVE_FROM_WATCH_LATER,payload:{video}})        
        setIsWatchLaterLoading(false);
    }

    // Can be moved outside of component on refactoring
    const togglePlaylistModal = () => {
        playlistModalRef.current.classList.toggle('active')
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
                                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                <span> {video.likes}</span>
                            </div>                                                        
                        </button>
                    }
                    {
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
                    }



                    {
                        !loggedInUser &&
                        <button 
                            onClick={() => alert("Please login to add video to watch later.")} 
                            className="btn-solid secondary">                                                            
                            <div>
                                <i className="fa fa-clock-o"></i>                                
                            </div>                                                        
                        </button>
                    }
                    {
                        loggedInUser && !isVideoPresentInPlaylistVideos(video,getUserPlaylist(dataState.playlist,'Watch Later')) &&
                        <button 
                            onClick={() => addToWatchLater(setIsWatchLaterLoading)} 
                            className="btn-solid secondary" disabled={isWatchLaterLoading}>
                            {
                                !isWatchLaterLoading &&
                                <div>
                                    <i className="fa fa-clock-o"></i>                                    
                                </div>
                            }
                            {
                                isWatchLaterLoading &&
                                <div className="small-spinner"></div>
                            }
                        </button>
                    }
                    {
                        loggedInUser && isVideoPresentInPlaylistVideos(video,getUserPlaylist(dataState.playlist,'Watch Later')) &&
                        <button 
                            onClick={() => removeFromWatchLater(setIsWatchLaterLoading)} 
                            className="btn-solid secondary" disabled={isWatchLaterLoading}>
                            {
                                !isWatchLaterLoading &&
                                <div>
                                    <i className="fa fa-clock-o text-primary"></i>                                    
                                </div>
                            }
                            {
                                isWatchLaterLoading &&
                                <div className="small-spinner"></div>
                            }
                        </button>
                    }                    




                    {
                        !loggedInUser &&
                        <button onClick={() => alert("Please login to save video to your playlist.")} className="btn-solid secondary">
                            <i className="fa fa-save text-size-1"></i>
                        </button>           
                    }
                    {
                        loggedInUser &&
                        <button onClick={() => togglePlaylistModal()} className="btn-solid secondary">
                            <i className="fa fa-save text-size-1"></i>
                        </button>                               
                    }                    
                </div>                
            </div>

            <PlaylistModal 
            togglePlaylistModal={togglePlaylistModal}
            video={video}
            ref={playlistModalRef}/>                     
        </>
    )
}

export default VideoWatch;