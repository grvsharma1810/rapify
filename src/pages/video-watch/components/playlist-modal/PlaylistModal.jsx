import './playlist-modal.css'

import './playlist-modal.css'
import React, {useState} from 'react'
import {useData} from '../../../../providers/DataProvider'
import {useAxios} from '../../../../useAxios'
import {useAuth} from '../../../../providers/AuthProvider'
import { 
    isVideoPresentInPlaylistVideos, 
    addToPlaylistVideos, 
    removeFromPlaylistVideos, 
    getUserPlaylistById,
    getUserPlaylistVideo
} from '../../../../utils'
import {ADD_TO_PLAYLIST} from '../../../../providers/data-reducer'


const PlylistModal = ({togglePlaylistModal,video},ref) => {

    const {loggedInUser} = useAuth();
    const {dataState,dataDispatch} = useData();
    const [isAddingToPlaylist,setIsAddingToPlaylist] = useState(false);
    const [isAddingToPlaylistVideo,setisAddingToPlaylistVideo] = useState(false);    
    const {postData,deleteData} = useAxios();
    console.log({dataState});

    const addNewPlaylist = async(event) => {                
        event.preventDefault()
        event.stopPropagation()
        if(dataState.userPlaylists.filter(playlist => {
            return playlist.name.toLowerCase() === event.target[0].value.toLowerCase()
                && playlist.type === 'user-created'
        }).length > 0){
            alert("Playlist Already Exists. Please check the name.")
            return;
        }
        setIsAddingToPlaylist(true);
        const response = await postData(`/users/${loggedInUser._id}/playlists`,{            
            name : event.target[0].value,
            type:'user-created'
        })
        event.target[0].value="";
        dataDispatch({type:ADD_TO_PLAYLIST,payload:{playlist:response.playlist}})
        setIsAddingToPlaylist(false);        
    }

    const addOrRemovePlaylistVideo = async(event) => {
        const playlistId = event.target.value;
        const playlist = getUserPlaylistById(dataState.userPlaylists,playlistId);
        if(event.target.checked){
            console.log("ADD")
            setisAddingToPlaylistVideo(true);
            await addToPlaylistVideos(
                loggedInUser, 
                video, 
                playlist,
                dataDispatch, postData);
            setisAddingToPlaylistVideo(false);
        }
        
        else{
            console.log("REMOVE")
            setisAddingToPlaylistVideo(true);
            await removeFromPlaylistVideos(
                loggedInUser,
                getUserPlaylistVideo(video,playlist),
                playlist,
                dataDispatch,
                deleteData
            )
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
                            dataState.userPlaylists
                            .filter(playlist => playlist.type === 'user-created')
                            .map(playlist => {
                                return (
                                    
                                        <div className="form-row" key={playlist._id}>                                            
                                                <p className="form-check">
                                                    <input
                                                        onChange={(event) => addOrRemovePlaylistVideo(event)} 
                                                        type="checkbox"                 
                                                        checked={isVideoPresentInPlaylistVideos(video,playlist)}  
                                                        id={playlist._id} 
                                                        name={playlist.name} 
                                                        value={playlist._id}
                                                        disabled={isAddingToPlaylistVideo}/> 
                                                    <label htmlFor={playlist._id}> {playlist.name}</label>
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