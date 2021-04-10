import { createContext, useContext, useReducer } from 'react'
import { dataReducer } from './data-reducer'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dataReducer, {
        users: [],
        allVideos: [],
        playlist: [],        
    })
    return (
        <DataContext.Provider value={{ dataState: state, dataDispatch: dispatch }}>
            {children}
        </DataContext.Provider>
    )
}


export const useData = () => {
    return useContext(DataContext);
}