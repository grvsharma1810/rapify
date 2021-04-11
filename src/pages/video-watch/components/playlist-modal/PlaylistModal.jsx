import './playlist-modal.css'

import './playlist-modal.css'
import React, {useState} from 'react'
import {useData} from '../../../../data-context'
import {useAxios} from '../../../../useAxios'
import {useAuth} from '../../../../auth-context'
import {ADD_TO_PLAYLIST, ADD_TO_PLAYLIST_VIDEO,REMOVE_FROM_PLAYLIST_VIDEO} from '../../../../data-reducer'

const getUserPlaylist = (allPlaylists,playlistId) => {
    return allPlaylists.find(playlist =>{
        return parseInt(playlist.id) === parseInt(playlistId)
    })
}

const getUserPlaylistVideo = (allPlaylists,playlistId,video) => {
    return allPlaylists.find(playlist =>{
        return parseInt(playlist.id) === parseInt(playlistId) && playlist.type === 'user-created'
    }).videos
    .find(playlistVideo => parseInt(playlistVideo.parentVideo) === parseInt(video.id))
}

const isVideoAlreadyAddedToPlaylist = (playlist,video) => {    
    return playlist.videos.filter(playlistVideo => parseInt(playlistVideo.parentVideo) === parseInt(video.id)).length > 0    
}

const PlylistModal = ({togglePlaylistModal,video},ref) => {

    const {loggedInUser} = useAuth();
    const {dataState,dataDispatch} = useData();
    const [isAddingToPlaylist,setIsAddingToPlaylist] = useState(false);
    const [isAddingToPlaylistVideo,setisAddingToPlaylistVideo] = useState(false);
    const {postData:postPlaylistData} = useAxios('/api/playlist');
    const {postData:postPlaylistVideoData,deleteData:deletePlaylistVideoData} = useAxios('/api/playlistVideo');
    console.log(dataState.playlist);

    const addNewPlaylist = async(event) => {                
        event.preventDefault()
        event.stopPropagation()
        if(dataState.playlist.filter(playlist => playlist.name.toLowerCase() === event.target[0].value.toLowerCase()).length > 0){
            alert("Playlist Already Exists. Please check the name.")
            return;
        }
        setIsAddingToPlaylist(true);
        const response = await postPlaylistData({
            parentUser : loggedInUser.id,
            name : event.target[0].value,
            type:'user-created'
        })
        event.target[0].value="";
        dataDispatch({type:ADD_TO_PLAYLIST,payload:{newPlaylist:{...response,videos:[]}}})
        setIsAddingToPlaylist(false);        
    }

    const addOrRemovePlaylistVideo = async(event) => {
        const playlistId = event.target.value;
        console.log(getUserPlaylist(dataState.playlist,playlistId),event.target.checked);
        if(event.target.checked){
            console.log("ADD")
            setisAddingToPlaylistVideo(true);
            const response = await postPlaylistVideoData({
                parentVideo : video.id,
                parentPlaylist: getUserPlaylist(dataState.playlist,playlistId).id
            })
            dataDispatch({
                type:ADD_TO_PLAYLIST_VIDEO,
                payload:{
                    playlist:getUserPlaylist(dataState.playlist,playlistId),
                    video:response
                }})
            setisAddingToPlaylistVideo(false);
        }
        
        else{
            console.log("REMOVE")
            setisAddingToPlaylistVideo(true);
            await deletePlaylistVideoData(getUserPlaylistVideo(dataState.playlist,playlistId,video)) 
            dataDispatch({
                type:REMOVE_FROM_PLAYLIST_VIDEO,
                payload:{
                    playlist:getUserPlaylist(dataState.playlist,playlistId),
                    video:video
                }})
            setisAddingToPlaylistVideo(false);
        }
    }

    return (
        <>            
            <div className="modal-bg" ref={ref}>
                <div className="modal">
                    <div className="flex flex-column flex-gap-1">
                        <h3 className="text-size-2">Add To Playlist</h3>
                        {
                            dataState.playlist
                            .filter(playlist => playlist.type === 'user-created')
                            .map(playlist => {
                                return (
                                    
                                        <div className="form-row" key={playlist.id}>                                            
                                                <p className="form-check">
                                                    <input
                                                    onChange={(event) => addOrRemovePlaylistVideo(event)} 
                                                    type="checkbox"                 
                                                    checked={isVideoAlreadyAddedToPlaylist(playlist,video)}                                    
                                                    id={playlist.id} 
                                                    name={playlist.name} 
                                                    value={playlist.id}
                                                    disabled={isAddingToPlaylistVideo}/> 
                                                    <label htmlFor={playlist.id}> {playlist.name}</label>
                                                </p>                                                        
                                        </div>                                                                        
                                )
                            })
                        }
                        
                        <form onSubmit={(event) => addNewPlaylist(event)}>
                            <div className="form-row">
                                <p className="form-field">                            
                                    <input type="text" placeholder="New Playlist name.." name="newPlaylistNameInput" autoComplete="off" required/> 
                                </p>                             
                                <button className="btn-solid primary" disabled={isAddingToPlaylist}>
                                    {!isAddingToPlaylist && <i className="fa fa-plus"></i>}
                                    {isAddingToPlaylist && <div className="small-spinner"></div>}
                                </button>   
                            </div>
                        </form>

                        <div className="align-self-end">                                                                                                                    
                            <button 
                            onClick={() => togglePlaylistModal()}
                            className="btn-solid secondary">Close</button>
                        </div>
                    </div>
                </div>
            </div>            
        </>
    )
}

const forwardedPlaylistModalWithRef = React.forwardRef(PlylistModal)

export default forwardedPlaylistModalWithRef;