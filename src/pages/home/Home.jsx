import './home.css';

import { useData } from '../../providers/DataProvider';
import VideoCard from './components/video-card/video-card'

const Home = () => {

    const { dataState } = useData();    
    console.log(dataState.allVideos)
    const allVideos = dataState.allVideos

    return (
        <>
            <div className="banner mb-1">
                <p>
                    Welcome to Rapify, this is the place for real Hip-Hop fans and artists.
                    If you are an artist, you can show your talent here to the masses and let people know you better.
                    And if you are a hardcore hip-hop fan, you can enjoy the beats here
                    and show love to this community. If you think what so called "Honey Singh" does is a hip hop
                    then you need to explore more on this platform. I have created this for everyone out there
                    who has a special place for HIP-HOP in their hearts. ENJOY THE BARS.
                </p>
                <p className="my-name">- <i class="fa fa-pencil"></i><span> Gaurav Sharma</span></p>
            </div>
            <div className="flex">                        
                {                                        
                    allVideos.map((video) => {
                        return <VideoCard video={video} user={video.user} key={video._id} />
                    })                
                }
            </div>
        </>        
                    
    )
}

export default Home