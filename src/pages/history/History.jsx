import './history.css'
import {useData} from '../../data-context'
import HistoryCard from './components/history-card/HistoryCard'

const History = () => {

    const {dataState} = useData();    
    const history = dataState.playlist.find(playlist => {
        return playlist.name === 'History' && playlist.type === 'default';
    });

    return (
        <>
            <h4 className="text-size-2">Your History</h4>
            <div className="flex mt-1">
                {
                    history?.videos.length ==0 &&
                    <p>History is empty.</p>
                }
                {              
                    history?.videos.length !==0 &&
                    history.videos.map((historyVideo) => {
                        return <HistoryCard historyVideo={historyVideo} key={historyVideo.id} />
                    })
                }                
            </div>
        </>
    )
}

export default History;