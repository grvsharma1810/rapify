import './history-card.css';
import {useData} from '../../../../data-context'
import {useNavigate} from 'react-router-dom'

const HistoryCard = ({historyVideo}) => {

    const navigate = useNavigate();        

    return (
        <div>
            History Card
        </div>
    )
}

export default HistoryCard;