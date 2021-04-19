import './video-card.css'
import { useNavigate } from 'react-router-dom'
import { getRandomColor } from '../../../../utils'


const VideoCard = ({ video, user }) => {

    const navigate = useNavigate();
    const { thumbnailUrl, name } = video;

    return (
        <div className="video-card" onClick={() => navigate(`watch/${video._id}`)}>
            <img className="img" src={thumbnailUrl} alt="thumbnail" />
            <div className="card-body">
                <div className="avatar-wrapper">
                    {user.avatarUrl === "" && <div className={`avatar bg-${getRandomColor()}-600 letter-avatar`}>{user.name[0].toUpperCase()}</div>}
                    {user.avatarUrl !== "" && <img src={`${user.avatarUrl}`} alt="Avatar" className="avatar" />}
                </div>
                <div className="flex flex-column">
                    <h2 className="text-size-1">
                        {name}
                    </h2>
                    <p>{user.name}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard;