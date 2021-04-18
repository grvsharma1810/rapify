import {useData} from '../../data-context'

const WatchLater = () => {
    const {dataState} = useData();        

    return (
        <>
            <h4 className="text-size-2">Watch Later</h4>            
        </>
    )
}

export default WatchLater;