import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import AudioContext from '../contexts/AudioContext';
import React from 'react';

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

  return (
    <AudioContext.Provider value={{ isMuted, setIsMuted, audioRef, videoRef }}>
      <div className="container">
        <button id="muteButton" onClick={handleMute}>
          {isMuted ? '🔇 Sound Off' : '🔊 Sound On'}
        </button>
        <button id="restartButton" onClick={handleRestart}>Back to Start</button>
        <Outlet />
      </div>
    </AudioContext.Provider>
  );
}

export default Layout;