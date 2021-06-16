import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { dataReducer, SET_ALL_VIDEOS_DATA } from './data-reducer'
import { fetchVideosService } from "../services/fetchVideosService"

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [isInitialAppDataLoading, setIsInitialAppDataLoading] = useState(true);

    const [state, dispatch] = useReducer(dataReducer, {
        allVideos: [],
        userPlaylists: [],
    })

    useEffect(() => {
        (async function () {
            const { videos } = await fetchVideosService();
            dispatch({ type: SET_ALL_VIDEOS_DATA, payload: { videos } })
            setIsInitialAppDataLoading(false);
        })()
    }, [])

    return (
        <DataContext.Provider value={{
            dataState: state,
            dataDispatch: dispatch,
            isInitialAppDataLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}


export const useData = () => {
    return useContext(DataContext);
}