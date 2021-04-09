import './video-card.css'
import { useNavigate } from 'react-router-dom'

const getVideoUser = (video, allUsers) => {
    return allUsers.find(user => parseInt(user.id) === parseInt(video.parentUser))
}

const VideoCard = ({ video, allUsers }) => {

    const navigate = useNavigate();
    const { thumbnailUrl, name } = video;

    return (
        <div className="video-card" onClick={() => navigate(`watch/${video.id}`)}>
            <img className="img" src={thumbnailUrl} alt="thumbnail" />
            <div className="card-body">
                <div className="avatar-wrapper">
                    <img src={`${getVideoUser(video, allUsers).userAvatarUrl}`} alt="Avatar" className="avatar" />
                </div>
                <div className="flex flex-column">
                    <h2 className="text-size-1">
                        {name}
                    </h2>
                    <p>{getVideoUser(video, allUsers).screenName}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard;