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
      "476996be",
      "c93d9638",
      "afe01fd",
      "2c62a5e8",
      "146fc9a",
    ];
    sessionStorage.setItem('oddTags', JSON.stringify(oddTags));
    const evenTags = [
      "4eb97bef",
      "177e7192",
      "33e5a55a",
      "cfba349a",
      "b5aebc13",
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
      >
        <source src={ bgAudio } type="audio/mpeg" />
      </audio>

      <div className="welcome-page content">
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
        {isStock ? <p>請戴耳機體驗</p> : <p>請聯繫工作人員補充花朵</p>}
        <p>Click Start to begin</p>
      </div>

      {isStock && (
        <button 
          id="nextButton"
        onClick={() => navigate('/start')}
        >
          Start
        </button>
      )}
      <ToastContainer />
    </>
  );
};

export default WelcomePage;