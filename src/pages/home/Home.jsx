import "./home.css";

import { useData } from "../../providers/DataProvider";
import VideoCard from "./components/video-card/video-card";

const Home = () => {
	const { dataState } = useData();
	console.log(dataState.allVideos);
	const allVideos = dataState.allVideos;

	return (
		<div className="flex">
			{allVideos.map((video) => {
				return (
					<VideoCard
						video={video}
						user={video.user}
						key={video._id}
					/>
				);
			})}
		</div>
	);
};

export default Home;
