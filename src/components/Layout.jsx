import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import AudioContext from '../contexts/AudioContext';
import HomeIcon from '@mui/icons-material/Home';
import ReplayIcon from '@mui/icons-material/Replay';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';   
import VolumeOffIcon from '@mui/icons-material/VolumeOff'; 
import SkipNextIcon from '@mui/icons-material/SkipNext';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


function Layout() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();  // Add this


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

  const handleSkip = () => {
    switch(location.pathname) {
      case '/yes':
        navigate('/black-box');
        break;
      case '/no':
        navigate('/black-box');
        break;
      case '/black-box':
        navigate('/question');
        break;
      // case '/number':
      //   navigate('/result');
      //   break;
      // case '/petal':
      //   navigate('/ending');
      //   break;
      case '/ending':
        navigate('/');
        break;
      default:
        break;
    }
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => 
        console.log("Audio replay failed:", error)
      );
    }
  };

  const shouldShowSkip = () => {
    const skipPaths = ['/yes', '/no', '/black-box', '/ending'];
    return skipPaths.includes(location.pathname);
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
          {shouldShowSkip() && (
            <button id="skipButton" onClick={handleSkip}><KeyboardDoubleArrowRightIcon /></button>
          )}
        </div>
        <Outlet />
      </div>
    </AudioContext.Provider>
  );
}

export default Layout;