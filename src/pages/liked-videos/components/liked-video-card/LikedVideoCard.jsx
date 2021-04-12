import './liked-video-card.css'
import {useData} from '../../../../data-context'
import {useNavigate} from 'react-router-dom'

const getVideoUser = (video, allUsers) => {
    return allUsers.find(user => user.id.toString() === video.parentUser.toString())
}

const getVideo = (videoId, allVideos) => {
    return allVideos.find(video => {
        return video.id.toString() === videoId.toString();
    })
}
const LikedVideoCard = ({ likedVideo}) => {

    const navigate = useNavigate();
    const {dataState} = useData();
    const video = getVideo(likedVideo.parentVideo,dataState.allVideos);    

    return (
        <div className="video-card" onClick={() => navigate(`/watch/${video.id}`)}>
            <img className="img" src={video.thumbnailUrl} alt="thumbnail" />
            <div className="card-body">
                <div className="avatar-wrapper">
                    <img src={`${getVideoUser(video, dataState.users).userAvatarUrl}`} alt="Avatar" className="avatar" />
                </div>
                <div className="flex flex-column">
                    <h2 className="text-size-1">
                        {video.name}
                    </h2>
                    <p>{getVideoUser(video, dataState.users).screenName}</p>                    
                </div>                
            </div>            
        </div>
    )
}

export default LikedVideoCard;