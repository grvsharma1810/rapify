import './App.css';

import { useRef } from 'react'
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './shared-components/PrivateRoute'

import Navbar from './shared-components/navbar/Navbar';
import Sidebar from './shared-components/sidebar/Sidebar'
import History from './pages/history/History'
import Home from './pages/home/Home'
import LikedVideos from './pages/liked-videos/LikedVideos'
import SavedPlaylists from './pages/saved-playlists/SavedPlaylists'
import UserInfo from './pages/user-info/UserInfo'
import VideoWatch from './pages/video-watch/VideoWatch'
import PlaylistView from './pages/playlist-view/PlaylistView'
import WatchLater from './pages/watch-later/WatchLater'
import Login from './pages/login/Login'
import UploadVideo from './pages/upload-video/UploadVideo'

import { useData } from './providers/DataProvider'

import Spinner from './shared-components/spinner/Spinner';
import SignUp from './pages/sign-up/SignUp';


function App() {

  const { isInitialAppDataLoading } = useData();

  const sidebarRef = useRef(null)

  const openSidebar = () => {
    sidebarRef.current.style.left = '0'
    sidebarRef.current.style.padding = '1rem'
  }

  const closeSidebar = () => {
    sidebarRef.current.style.left = '-100%'
    sidebarRef.current.style.padding = '0'
  }

  return (
    <>
      {isInitialAppDataLoading && <Spinner description="Loading Videos.." />}
      {
        !isInitialAppDataLoading &&
        <div className="App">
          <Navbar openSidebar={openSidebar} />
          <Sidebar
            closeSidebar={closeSidebar}
            ref={sidebarRef} />
          <div className="main-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/watch/:videoId" element={<VideoWatch />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <PrivateRoute path="/liked" element={<LikedVideos />} />
              <PrivateRoute path="/playlists" element={<SavedPlaylists />} />
              <PrivateRoute path="/watch-later" element={<WatchLater />} />
              <PrivateRoute path="/playlists/:playlistsId" element={<PlaylistView />} />
              <PrivateRoute path="/user" element={<UserInfo />} />
              <PrivateRoute path="/history" element={<History />} />
              <PrivateRoute path="/upload-video" element={<UploadVideo />} />
              <PrivateRoute path="/account" element={<UserInfo />} />
            </Routes>
          </div>
        </div>
      }
    </>
  );
}

export default App;
