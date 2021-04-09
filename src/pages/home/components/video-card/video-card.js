import './video-card.css'

const VideoCard = ({ thumbnailUrl, name }) => {
    return (
        <div className="video-card">
            <img className="img" src={thumbnailUrl} alt="thumbnail" />
            <div className="card-body">
                <div className="avatar-wrapper">
                    <img src="https://pbs.twimg.com/profile_images/1238749114348662784/p9hc5fuP_400x400.jpg" alt="Avatar" className="avatar" />
                </div>
                <div className="flex flex-column">
                    <h2 className="text-size-1">
                        {name}
                    </h2>
                    <p>User Name</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard;