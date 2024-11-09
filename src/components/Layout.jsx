import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import AudioContext from '../contexts/AudioContext';
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';      // For unmuted state
import VolumeOffIcon from '@mui/icons-material/VolumeOff';    // For muted state


function Layout() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const handleMute = () => {
    setIsMuted(prevMuted => {
      if (audioRef.current) {
        audioRef.current.muted = !prevMuted;
      }
      return !prevMuted;
    });
  };

  const handleRestart = () => {
    navigate('/');
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => 
        console.log("Audio replay failed:", error)
      );
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, setIsMuted, audioRef, videoRef }}>
      <div className="container">
        <button id="muteButton" onClick={handleMute}>
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </button>
        <div className='layout-buttons'>
          <button id="restartButton" onClick={handleRestart}><HomeIcon /></button>
          <button id="replayButton" onClick={handleReplay}><ReplayIcon /></button>
        </div>
        <Outlet />
      </div>
    </AudioContext.Provider>
  );
}

export default Layout;