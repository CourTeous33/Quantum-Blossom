import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioContext from '../contexts/AudioContext';
import bg1 from '../statics/videos/bg1.mp4';
import bgAudio from '../statics/audios/2-yes.mp3';

const YesPage = () => {
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
        onEnded={() => {
            navigate('/black-box'); // Assuming you want to navigate to next page when audio ends
        }}
      >
        <source src={ bgAudio } type="audio/mpeg" />
      </audio>

      <div className='welcome-page start-page content'>
        <h1>「未來，真是個有趣的詞。」</h1>
      </div>  
    </>
  );
};

export default YesPage;