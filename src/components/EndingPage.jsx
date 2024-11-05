import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioContext from '../contexts/AudioContext';
import bg1 from '../statics/videos/bg9.mp4';
import bgAudio from '../statics/audios/9-ending.mp3';

const ResultPage = () => {
  const { audioRef, videoRef, isMuted } = useContext(AudioContext);
  const navigate = useNavigate();

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
        onEnded={() => navigate('/')}
      >
        <source src={ bgAudio } type="audio/mpeg" />
      </audio>

      <div className='ending-page content'>
        <h1>
        「注意尚未顯現的潛在路徑！」
        </h1>
      </div>

      <button id="nextButton" onClick={() => navigate('/')}>{"返回首頁"}</button>
    </>
  );
};

export default ResultPage;