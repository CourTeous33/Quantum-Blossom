import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioContext from '../contexts/AudioContext';
import bg1 from '../statics/videos/bg1.mp4';
import logo from '../statics/1-Quantum-Blossom-2024-10-29.png';
import bgAudio from '../statics/audios/1-desktop.mp3';

const StartPage = () => {
  const { audioRef, videoRef, isMuted } = useContext(AudioContext);
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = bg1;
      videoRef.current.play().catch((error) => 
        console.log("Video play failed:", error)
      );
    }
    
    if (audioRef.current) {
      audioRef.current.src = bgAudio;
      audioRef.current.muted = isMuted;
      audioRef.current.play().catch((error) => 
        console.log("Audio play failed:", error)
      );

      // Add timeupdate event listener
      const handleTimeUpdate = () => {
        if (audioRef.current.currentTime >= 10) {  // 10 seconds
          setShowButtons(true);
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        }
      };

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

      // Cleanup
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        }
      };
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        id="videoPlayer"
      >
        <source src={ bg1 } type="video/mp4" />
      </video>
      
      <audio
        ref={audioRef}
        id="audioPlayer"
      >
        <source src={ bgAudio } type="audio/mpeg" />
      </audio>

      <div className='start-page welcome-page content'>
        <div className='welcome-page-title'>
          
          <h1>量子花綻</h1>
          <img src={ logo } alt="Logo" />
        </div> 
        {showButtons && 
          <div className='start-page-buttons'>
            <button onClick={() => navigate('/no')}>否</button>
            <button onClick={() => navigate('/yes')}>是</button>
          </div>
        }
      </div>  
    </>
  );
};

export default StartPage;