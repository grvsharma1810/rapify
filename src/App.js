import './App.css';

import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'

import Navbar from './shared-components/navbar/Navbar';
import Sidebar from './shared-components/sidebar/Sidebar'
import History from './pages/history/History'
import Home from './pages/home/Home'
import LikedVideos from './pages/liked-videos/LikedVideos'
import Playlists from './pages/playlists/Playlists'
import UserInfo from './pages/user-info/UserInfo'
import VideoWatch from './pages/video-watch/VideoWatch'
import PlaylistView from './pages/playlist-view/PlaylistView'
import WatchLater from './pages/watch-later/WatchLater'
import Login from './pages/login/Login'

import { useData } from './data-context'
import { useAxios } from './useAxios'

import { SET_ALL_VIDEOS_DATA, SET_ALL_USERS_DATA } from './data-reducer'
import Spinner from './shared-components/spinner/Spinner';

const useInitialLoading = () => {
  const { dataState, dataDispatch } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const { getData: getVideoData } = useAxios('/api/video');
  const { getData: getUserData } = useAxios('/api/user');


  useEffect(() => {
    if (dataState.allVideos.length === 0 && dataState.users.length === 0) {
      (async function () {
        setIsLoading(true);
        const allVideos = await getVideoData();
        dataDispatch({ type: SET_ALL_VIDEOS_DATA, payload: { allVideos } })
        const users = await getUserData();
        dataDispatch({ type: SET_ALL_USERS_DATA, payload: { users } })
        setIsLoading(false);
      })()
    }
  }, [])
  return { isLoading };
}

function App() {

  const { isLoading } = useInitialLoading();

  return (
    <>
      {isLoading && <Spinner description="Loading Videos.." />}
      {
        !isLoading &&
        <div className="App">
          <Navbar />
          <Sidebar />
          <div className="main-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch/:videoId" element={<VideoWatch />} />
              <Route path="/login" element={<Login />} />

              <PrivateRoute path="/liked" element={<LikedVideos />} />
              <PrivateRoute path="/playlists" element={<Playlists />} />
              <PrivateRoute path="/watch-later" element={<WatchLater />} />
              <PrivateRoute path="/playlists/:playlistsId" element={<PlaylistView />} />
              <PrivateRoute path="/user" element={<UserInfo />} />
              <PrivateRoute path="/history" element={<History />} />
            </Routes>
          </div>
        </div>
      }
    </>
  );
}

export default App;
