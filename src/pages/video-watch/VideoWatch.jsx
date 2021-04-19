import './video-watch.css'

import { useParams } from 'react-router-dom';
import { useData } from '../../providers/DataProvider'
import { useAuth } from '../../providers/AuthProvider'
import { useState, useEffect, useRef } from 'react';
import { useAxios } from '../../useAxios';
import {
    addToPlaylistVideos,
    removeFromPlaylistVideos,
    getVideoDetails,
    getUserPlaylist,
    getUserPlaylistVideo,
    isVideoPresentInPlaylistVideos
} from '../../utils'
import { UPDATE_USER_VIDEO } from '../../providers/data-reducer';
import PlaylistModal from './components/playlist-modal/PlaylistModal'


const getYouTubeId = (youtubeUrl) => {
    return youtubeUrl.split("?v=")[1];
}


const VideoWatch = () => {

    const [isLikedLoading,setIsLikedLoading] = useState(false);
    const [isWatchLaterLoading, setIsWatchLaterLoading] = useState(false);
    const playlistModalRef = useRef(null);

    const {videoId} = useParams();       
    const {dataState,dataDispatch}  = useData();
    const {postData, deleteData} = useAxios();
    console.log({dataState});
    const {loggedInUser} = useAuth();
    const allVideos = dataState.allVideos;
    const userPlaylists = dataState.userPlaylists
    const video = getVideoDetails(allVideos,videoId)    


    const addToLikedVideos = async () => { 
        setIsLikedLoading(true);
        await addToPlaylistVideos(loggedInUser,video,getUserPlaylist(userPlaylists,'Liked','default'),dataDispatch,postData); 
        const likes = video.likes + 1;
        await postData(`/users/${video.user._id}/videos/${video._id}`,{likes })
        dataDispatch({type:UPDATE_USER_VIDEO, payload:{            
            video,
            key : 'likes',
            value : likes
        }})
        setIsLikedLoading(false);    
    }
    
    
    const removeFromLikedVideos = async () => { 
        setIsLikedLoading(true);        
        await removeFromPlaylistVideos(loggedInUser,getUserPlaylistVideo(video,getUserPlaylist(userPlaylists,'Liked','default')),getUserPlaylist(userPlaylists,'Liked','default'),dataDispatch,deleteData)
        const likes = video.likes - 1;
        await postData(`/users/${video.user._id}/videos/${video._id}`,{likes })
        dataDispatch({type:UPDATE_USER_VIDEO, payload:{            
            video,
            key : 'likes',
            value : likes
        }})
        setIsLikedLoading(false);    
    }


    const addToWatchLaterVideos = async() => {
        setIsWatchLaterLoading(true);
        await addToPlaylistVideos(loggedInUser,video,getUserPlaylist(userPlaylists,'Watch Later','default'),dataDispatch,postData); 
        setIsWatchLaterLoading(false);
    }

    const removeFromWatchLaterVideos = async() => {
        setIsWatchLaterLoading(true);
        await removeFromPlaylistVideos(loggedInUser,getUserPlaylistVideo(video,getUserPlaylist(userPlaylists,'Watch Later','default')),getUserPlaylist(userPlaylists,'History','default'),dataDispatch,deleteData)
        setIsWatchLaterLoading(false);
    }

    const togglePlaylistModal = () => {
        playlistModalRef.current.classList.toggle('active')
    }  


    useEffect(() => {        
        (async function(){
            await postData(`/users/${video.user._id}/videos/${video._id}`,{views : video.views+1})
            dataDispatch({type:UPDATE_USER_VIDEO, payload:{            
                video,
                key : 'views',
                value : video.views + 1
            }})
        })()
        if(loggedInUser){
            (async function(){
                await addToPlaylistVideos(loggedInUser,video,getUserPlaylist(userPlaylists,'History','default'),dataDispatch,postData);
            })()
        }      
        // eslint-disable-next-line  
    },[])

    
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
                <p>{video.views} Views</p>
                <div className="flex flex-gap-sm">     
                    {
                        !loggedInUser &&
                        <button 
                            onClick={() => alert("Login Required")} 
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
                        loggedInUser && !isVideoPresentInPlaylistVideos(video,getUserPlaylist(userPlaylists,'Liked','default')) &&
                        <button 
                            onClick={() => addToLikedVideos()} 
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
                        loggedInUser && isVideoPresentInPlaylistVideos(video,getUserPlaylist(userPlaylists,'Liked','default')) &&
                        <button 
                            onClick={() => removeFromLikedVideos()} 
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
                            onClick={() => alert("Login Required")} 
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
                        loggedInUser && !isVideoPresentInPlaylistVideos(video,getUserPlaylist(userPlaylists,'Watch Later','default')) &&
                        <button 
                            onClick={() => addToWatchLaterVideos()} 
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
                        loggedInUser && isVideoPresentInPlaylistVideos(video,getUserPlaylist(userPlaylists,'Watch Later','default')) &&
                        <button 
                            onClick={() => removeFromWatchLaterVideos()} 
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

            {
                loggedInUser &&
                <PlaylistModal 
                togglePlaylistModal={togglePlaylistModal}
                video={video}
                ref={playlistModalRef}/>    
            }
        </>
    )
}

export default VideoWatch;