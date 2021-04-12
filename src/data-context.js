import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { dataReducer, SET_ALL_VIDEOS_DATA, SET_ALL_USERS_DATA } from './data-reducer'
import { useAxios } from './useAxios'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const [isInitialAppDataLoading, setIsInitialAppDataLoading] = useState(true);

    const { getData: getVideoData } = useAxios('/api/video');
    const { getData: getUserData } = useAxios('/api/user');

    const [state, dispatch] = useReducer(dataReducer, {
        users: [],
        allVideos: [],
        playlist: [],
    })
    console.log({state});

    useEffect(() => {
        (async function () {                        
            const allVideos = await getVideoData();
            dispatch({ type: SET_ALL_VIDEOS_DATA, payload: { allVideos } })
            const users = await getUserData();
            dispatch({ type: SET_ALL_USERS_DATA, payload: { users } })
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