import './carousel-video-card.css'
import { useNavigate } from 'react-router-dom'
import {getRandomColor} from '../../../../utils'

const CarouselVideoCard = ({ video }) => {

    const navigate = useNavigate();

    return (
        <div className="carousel-video-card" onClick={() => navigate(`/watch/${video._id}`)}>
            <img className="img" src={video.thumbnailUrl} alt="thumbnail" />
            <div className="card-body">
                <div className="avatar-wrapper">
                    {video.user.avatarUrl === "" && <div className={`avatar bg-${getRandomColor()}-600 letter-avatar`}>{video.user.name[0].toUpperCase()}</div>}
                    {video.user.avatarUrl !== "" && <img src={`${video.user.avatarUrl}`} alt="Avatar" className="avatar" />}
                </div>
                <div className="flex flex-column">
                    <h2 className="text-size-1">
                        {video.name}
                    </h2>
                    <p>{video.user.name}</p>
                </div>
            </div>
        </div>
    )
}

export default CarouselVideoCard;