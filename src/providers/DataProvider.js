import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { dataReducer, SET_ALL_VIDEOS_DATA } from './data-reducer'
import { useAxios } from './AxiosProvider' 

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [isInitialAppDataLoading, setIsInitialAppDataLoading] = useState(true);
    const { getData } = useAxios()

    const [state, dispatch] = useReducer(dataReducer, {
        allVideos: [],
        userPlaylists: [],
    })

    useEffect(() => {
        (async function () {
            const { videos } = await getData(`/videos`);
            dispatch({ type: SET_ALL_VIDEOS_DATA, payload: { videos } })
            setIsInitialAppDataLoading(false);
        })()
        // eslint-disable-next-line
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