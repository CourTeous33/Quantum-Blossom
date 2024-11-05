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