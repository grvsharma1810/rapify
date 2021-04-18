import './home.css';

import { useData } from '../../data-context';
import VideoCard from './components/video-card/video-card'

const Home = () => {

    const { dataState } = useData();    
    console.log(dataState.allUsers)
    const allUsers = dataState.allUsers

    return (

        <div className="flex">            
            {                        
                allUsers.map(user => {
                    return user.videos.map((video) => {
                        return <VideoCard video={video} user={user} key={video._id} />
                    })
                })
            }
        </div>
                    
    )
}

export default Home