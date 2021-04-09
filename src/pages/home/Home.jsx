import './home.css';

import { useEffect, useState } from 'react'

import { SET_ALL_VIDEOS_DATA, SET_ALL_USERS_DATA } from '../../data-reducer'
import { useData } from '../../data-context';
import { useAxios } from '../../useAxios'
import VideoCard from './components/video-card/video-card'
import Spinner from '../../shared-components/spinner/Spinner'

const Home = () => {

    const { dataState, dataDispatch } = useData();    

    const allVideos = dataState.allVideos;        

    return (

        <div className="flex">                    
            {                        
                allVideos.map((video) => {
                    return <VideoCard {...video} key={video.id} />
                })
            }
        </div>
                    
    )
}

export default Home