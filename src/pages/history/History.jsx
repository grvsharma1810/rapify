import './history.css'
import {useData} from '../../data-context'
import HistoryCard from './components/history-card/HistoryCard'

const History = () => {

    const {dataState} = useData();
    console.log("FROM HISTORY",dataState);
    const history = dataState.playlist.find(playlist => {
        return playlist.name === 'History' && playlist.type === 'default';
    });

    return (
        <div className="flex">
            {              
                history.videos.map((historyVideo) => {
                    return <HistoryCard historyVideo={historyVideo} key={historyVideo.id} />
                })
            }
        </div>
    )
}

export default History;