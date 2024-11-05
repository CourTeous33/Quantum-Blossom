import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioContext from '../contexts/AudioContext';
import bg1 from '../statics/videos/bg1.mp4';
import logo from '../statics/1-Quantum-Blossom-2024-10-29.png';
import bgAudio from '../statics/audios/1-desktop.mp3';

const StartPage = () => {
  const { audioRef, videoRef, isMuted } = useContext(AudioContext);
  const navigate = useNavigate();
  const [isAudioFinished, setIsAudioFinished] = useState(false);

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
        onEnded={() => setIsAudioFinished(true)}
      >
        <source src={ bgAudio } type="audio/mpeg" />
      </audio>

      <div className='welcome-page start-page content'>
        <h1>量子花綻</h1>
        <img src={ logo } alt="Logo" />
        {isAudioFinished && 
          <div className='start-page-buttons'>
            <button onClick={() => navigate('/yes')}>是</button>
            <button onClick={() => navigate('/no')}>否</button>
          </div>
        }
      </div>  
    </>
  );
};

export default StartPage;