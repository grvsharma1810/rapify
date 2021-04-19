import "./upload-video.css"
import {useAxios} from '../../useAxios'
import {useAuth} from '../../providers/AuthProvider'
import { useState } from "react"
import {useData} from '../../providers/DataProvider'
import {ADD_USER_VIDEO} from '../../providers/data-reducer'

const UploadVideo = () => {
    
    const [isLoading,setIsLoading] = useState(false);
    const {postData} = useAxios();
    const {loggedInUser,addToLoggedInUserVideos} = useAuth();
    const {dataDispatch} = useData();
    
    const formSubmit = async(event) => {         
        event.preventDefault()
        event.stopPropagation()
        if(!event.target.checkValidity()){                
            event.target.classList.add('was-validated')
        }
        else{
            const name = event.target[0].value
            const youtubeUrl = event.target[1].value;
            const thumbnailUrl = event.target[2].value;
            const likes = 0;
            const dislikes = 0;
            const views = 0;
            setIsLoading(true);
            const {video} = await postData(`/users/${loggedInUser._id}/videos`,{
                name,youtubeUrl,thumbnailUrl,likes,dislikes,views
            })
            dataDispatch({type:ADD_USER_VIDEO, payload:{
                video : {
                    ...video,
                    user: { 
                        name: loggedInUser.name, 
                        avatarUrl: loggedInUser.avatarUrl,
                        _id: loggedInUser._id,                        
                    }
                }
            }})
            addToLoggedInUserVideos(video._id);
            event.target[0].value = "";
            event.target[1].value = "";
            event.target[2].value = "";
            setIsLoading(false);
        }        
    }

    return (
        <div className="flex h-center">
            <form className="form needs-validation" noValidate onSubmit={(event) => formSubmit(event)}> 
                <div className="form-row">
                    <p className="form-field">
                        <label htmlFor="name">Video Name</label>
                        <input id="name" type="text" placeholder="Video Name" name="name" required/>  
                        <span className="error-msg">Please enter valid name</span>
                        <span className="success-msg">Looks Good</span>
                    </p>                     
                </div> 
                <div className="form-row">
                    <p className="form-field">
                        <label htmlFor="youtubeUrl">Youtube URL</label>
                        <input id="youtubeUrl" type="url" placeholder="Youtube URl" name="youtubeUrl" required/>  
                        <span className="error-msg">Please enter valid url</span>
                        <span className="success-msg">Looks Good</span>
                    </p>                     
                </div>   
                <div className="form-row">
                    <p className="form-field">
                        <label htmlFor="thumbnailUrl">Thumbnail URL</label>
                        <input id="thumbnailUrl" type="url" placeholder="Thumbnail URL" name="thumbnailUrl" required/>  
                        <span className="error-msg">Please enter valid url</span>
                        <span className="success-msg">Looks Good</span>
                    </p>                     
                </div>   
                <div>
                    {!isLoading && <button className="btn-solid primary"><i className="fa fa-upload"></i> Upload</button>}
                    {isLoading && <button className="btn-solid secondary">Uploading...</button>}                    
                </div>                                                             
            </form>                                    
        </div>
    )
}

export default UploadVideo;