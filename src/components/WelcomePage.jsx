import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioContext from '../contexts/AudioContext';
import bg1 from '../statics/videos/bg1.mp4';
import logo from '../statics/1-Quantum-Blossom-2024-10-29.png';
import bgAudio from '../statics/audios/0-welcomePageBgm.mp3';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

  // Add this import

const WelcomePage = () => {
  const { audioRef, videoRef, isMuted } = useContext(AudioContext);
  const navigate = useNavigate();
  const [isStock, setIsStock] = useState(false);

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

  useEffect(() => {
    if ((!sessionStorage.getItem('oddTags') && !sessionStorage.getItem('evenTags'))) {
      setIsStock(false);
      console.log('no stock');
    } else if (JSON.parse(sessionStorage.getItem('evenTags')).length + JSON.parse(sessionStorage.getItem('oddTags')).length <= 1){
      setIsStock(false);
      console.log('no stock');
    } else {
      setIsStock(true);
      console.log('has stock');
      console.log(JSON.parse(sessionStorage.getItem('oddTags')).length);
      console.log(JSON.parse(sessionStorage.getItem('evenTags')).length);
    }
  }, []);

  const restock = () => {
    sessionStorage.clear();
    const oddTags = [
      "146FC9A",
      "2B21420F",
      "3FE26160",
      "476996BE",
      "AFE01FD"
    ];
    sessionStorage.setItem('oddTags', JSON.stringify(oddTags));
    const evenTags = [
      "65A65473",
      "7FBC7BF",
      "8561ED5D",
      "9A60E3B3",
      "B5AEBC13"
    ]
    sessionStorage.setItem('evenTags', JSON.stringify(evenTags));
    
    setIsStock(true);
    toast('花朵已補充完成');
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
        loop
      >
        <source src={ bgAudio } type="audio/mpeg" />
      </audio>

      <div className="welcome-page content">
        <div className='welcome-page-title'>
          <h1>量子花綻</h1>
          <img src={ logo } alt="Logo" onClick={() => {
              if (!window.clickCount) window.clickCount = 0;
              window.clickCount++;
              if (window.clickCount === 5) {
                window.clickCount = 0;
                restock()
              }
            }}
          />
        </div>
        <div className='welcome-page-text'>
          {isStock ? <p>請戴耳機體驗</p> : <p>請聯繫工作人員補充花朵</p>}
          <p>Click Start to Begin</p>
        </div>
      </div>

      {isStock && (
        <button 
          id="startButton"
        onClick={() => navigate('/start')}
        >
          開&nbsp;&nbsp;始
        </button>
      )}
      <ToastContainer />
    </>
  );
};

export default WelcomePage;