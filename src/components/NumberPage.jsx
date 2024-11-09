import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioContext from '../contexts/AudioContext';
import bg1 from '../statics/videos/bg6.mp4';
import bgAudio from '../statics/audios/6-number.mp3';

const NumberPage = () => {
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

  const handleAudioEnd = () => {
    if ((!sessionStorage.getItem('oddTags') && !sessionStorage.getItem('evenTags'))) {
        navigate('/no-stock');
      } else if (JSON.parse(sessionStorage.getItem('evenTags')).length + JSON.parse(sessionStorage.getItem('oddTags')).length <= 1){
        navigate('/no-stock');
      } else {
        navigate('/result');
      }
  }

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
        onEnded={handleAudioEnd}
      >
        <source src={ bgAudio } type="audio/mpeg" />
      </audio>
      
    </>
  );
};

export default NumberPage;