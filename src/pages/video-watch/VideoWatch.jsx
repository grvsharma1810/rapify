import './video-watch.css'

import {useParams} from 'react-router-dom';
import {useData} from '../../data-context'
import {useAuth} from '../../auth-context'
import { useState } from 'react';
import { useAxios } from '../../useAxios';
import {addToPlaylistVideos,removeFromPlaylistVideos} from '../../utils'
import { UPDATE_USER_VIDEO } from '../../data-reducer';

const getVideoDetails = (allUsers,videoId) =>{
    for(const user of allUsers){        
        const video = user.videos.find(video => video._id === videoId)
        if(video){
            return video;
        }
        else{
            continue;
        }
    }    
}

const getVideoUser = (allUsers,videoId) => {
    for(const user of allUsers){        
        const video = user.videos.find(video => video._id === videoId)
        if(video){
            return user;
        }
        else{
            continue;
        }
    }    
}

const getYouTubeId = (youtubeUrl) => {
    return youtubeUrl.split("?v=")[1];
}

const getUserPlaylist = (userPlaylists,playlistName,type) => {
    return userPlaylists.find(playlist => {
        return playlist.name === playlistName && playlist.type === type;
    });
}

const getUserPlaylistVideo = (video,playlist) => {
    return playlist.videos.find(playlistVideo => {
        return playlistVideo.videoId === video._id;
    })
}

const isVideoPresentInPlaylistVideos = (video,playlist) => {
    return playlist.videos.find(playlistVideo => {
        return playlistVideo.videoId === video._id;
    })!==undefined;        
}



const VideoWatch = () => {

    const [isLikedLoading,setIsLikedLoading] = useState(false);

    const {videoId} = useParams();       
    const {dataState,dataDispatch,isInitialAppDataLoading}  = useData();
    const {getData, postData, deleteData} = useAxios();
    console.log({dataState});
    const {loggedInUser} = useAuth();
    const allUsers = dataState.allUsers;
    const userPlaylists = dataState.userPlaylists
    const video = getVideoDetails(allUsers,videoId)    


    const addToLikedVideos = async () => { 
        setIsLikedLoading(true);
        await addToPlaylistVideos(loggedInUser,video,getUserPlaylist(userPlaylists,'Liked','default'),dataDispatch,postData); 
        dataDispatch({type:UPDATE_USER_VIDEO, payload:{
            user:getVideoUser(allUsers,videoId),
            video:video,
            key : 'likes',
            value : video.likes + 1
        }})
        setIsLikedLoading(false);    
    }
    
    
    const removeFromLikedVideos = async () => { 
        setIsLikedLoading(true);        
        await removeFromPlaylistVideos(loggedInUser,getUserPlaylistVideo(video,getUserPlaylist(userPlaylists,'Liked','default')),getUserPlaylist(userPlaylists,'Liked','default'),dataDispatch,deleteData)
        dataDispatch({type:UPDATE_USER_VIDEO, payload:{
            user:getVideoUser(allUsers,videoId),
            video:video,
            key : 'likes',
            value : video.likes - 1
        }})
        setIsLikedLoading(false);    
    }

    
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
                </div>
            </div>
        </>
    )
}

export default VideoWatch;