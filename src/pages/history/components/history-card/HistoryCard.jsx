import './history-card.css';
import {useData} from '../../../../providers/DataProvider'
import {useNavigate} from 'react-router-dom'
import {getVideoDetails,getRandomColor} from '../../../../utils'

const HistoryCard = ({historyVideo}) => {

    const navigate = useNavigate();
    const {dataState} = useData();
    const video = getVideoDetails(dataState.allVideos,historyVideo.videoId);

    return (
        <div className="video-card" onClick={() => navigate(`/watch/${video._id}`)}>
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
                    <p className="time">
                        Viewed On {new Date(historyVideo.time).toLocaleString("en-US")}
                    </p>
                </div>                
            </div>            
        </div>
    )
}

export default HistoryCard;