import './history.css'

import {useData} from '../../providers/DataProvider'
import HistoryCard from './components/history-card/HistoryCard'
import {getUserPlaylist} from '../../utils'

const History = () => {  
    
    const {dataState} = useData();    
    const history = getUserPlaylist(dataState.userPlaylists,'History','default');

    return (
        <>
            <h4 className="text-size-2">Your History</h4>
            <div className="flex mt-1">
                {
                    history?.videos.length === 0 &&
                    <p>History is empty.</p>
                }
                {              
                    history?.videos.length !== 0 &&
                    history.videos.sort((a,b) => new Date(b.time) - new Date(a.time)).map((historyVideo) => {
                        return <HistoryCard historyVideo={historyVideo} key={historyVideo._id} />
                    })
                }                
            </div>        
        </>
    )
}

export default History;