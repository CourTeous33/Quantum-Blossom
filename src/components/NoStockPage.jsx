import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioContext from '../contexts/AudioContext';
import bg1 from '../statics/videos/bg1.mp4';

const WelcomePage = () => {
  const { videoRef } = useContext(AudioContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = bg1;
      videoRef.current.play().catch((error) => 
        console.log("Video play failed:", error)
      );
    }
  }, []);

  const restock = () => {
    sessionStorage.clear();
    const oddTags = [
      "146fc9a",
      "2b21420f",
      "3fe26160",
      "476996be",
      "afe01fd"
    ];
    sessionStorage.setItem('oddTags', JSON.stringify(oddTags));
    const evenTags = [
      "65a65473",
      "7fbc7bfb",
      "8561ed5d",
      "9a60e3b3",
      "b5aebc13"
    ]
    sessionStorage.setItem('evenTags', JSON.stringify(evenTags));
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

      <div className="no-stock-page content">
        <p>請聯繫工作人員補充花朵</p>
      </div>

        <button 
            id="nextButton"
            onClick={() => {
              restock();
              navigate('/result');
            }}
        >
            補充完畢,繼續體驗
        </button>
    </>
  );
};

export default WelcomePage;