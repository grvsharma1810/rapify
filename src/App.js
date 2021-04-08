import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './shared-components/navbar/navbar';
import Sidebar from './shared-components/sidebar/sidebar'
import History from './pages/history/history'
import Home from './pages/home/home'
import LikedVideos from './pages/liked-videos/liked-videos'
import Playlists from './pages/playlists/playlists'
import ChannelInfo from './pages/channel-info/channel-info'
import VideoWatch from './pages/video-watch/video-watch'
import PlaylistView from './pages/playlist-view/playlist-view'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/watch/:videoId" element={<VideoWatch />} />
          <Route path="/liked" element={<LikedVideos />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlists/:playlistsId" element={<PlaylistView />} />
          <Route path="/channel" element={<ChannelInfo />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
