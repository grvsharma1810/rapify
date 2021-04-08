import './home.css';
import { useAxios } from '../../useAxios'
import VideoCard from './components/video-card/video-card'
import { dummyVideoData } from '../../server/video-data'

const Home = () => {
    // const { isLoading, getData } = useAxios('/api/watch');

    // useEffect(() => {
    //     async
    // }, [])

    return (
        <div className="flex">
            {
                dummyVideoData.map((video) => {
                    return <VideoCard {...video} key={video.id} />
                })
            }
        </div>
    )
}

export default Home