import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioContext from '../contexts/AudioContext';
import bg1 from '../statics/videos/bg1.mp4';
import bgAudio from '../statics/audios/5-question.mp3';

const YesPage = () => {
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
        if (audioRef.current.currentTime >= 37) {  // 37 seconds
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

      <div className='content'>
        <h2>「此刻，你想知道什麽？」</h2>
      </div>  
      {showButtons && (
        <button id="nextButton" onClick={() => navigate('/number')}>{"是，我確定"}</button>
      )}
    </>
  );
};

export default YesPage;