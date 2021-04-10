import './home.css';

import { useData } from '../../data-context';
import VideoCard from './components/video-card/video-card'

const Home = () => {

    const { dataState } = useData();    
    

    const allVideos = dataState.allVideos;        

    return (

        <div className="flex">
            {                        
                allVideos.map((video) => {
                    return <VideoCard video={video} allUsers={dataState.users} key={video.id} />
                })
            }
        </div>
                    
    )
}

export default Home