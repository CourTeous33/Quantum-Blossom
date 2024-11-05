import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioContext from '../contexts/AudioContext';
import bg1 from '../statics/videos/bg7.mp4';
import bgAudio from '../statics/audios/7-result.mp3';

const ResultPage = () => {
  const { audioRef, videoRef, isMuted } = useContext(AudioContext);
  const [tag, setTag] = useState("");
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

  useEffect(() => {
    getTag();
  }, []);

  const getTag = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    const oddTags = JSON.parse(sessionStorage.getItem('oddTags'));
    const evenTags = JSON.parse(sessionStorage.getItem('evenTags'));
    console.log(oddTags);
    console.log(evenTags);

    if (randomNumber % 2 === 0 && evenTags.length > 0) {
      const tagIdx = (randomNumber / 2) % evenTags.length;
      setTag(evenTags[tagIdx]);
      console.log(evenTags[tagIdx]);
      evenTags.splice(tagIdx, 1);
      sessionStorage.setItem('evenTags', JSON.stringify(evenTags));
    } else if (oddTags.length > 0) {
      const tagIdx = (randomNumber / 2) % oddTags.length;
      setTag(oddTags[tagIdx]);
      console.log(oddTags[tagIdx]);
      oddTags.splice(tagIdx, 1);
      sessionStorage.setItem('oddTags', JSON.stringify(oddTags));
    } else {
      const tagIdx = (randomNumber / 2) % evenTags.length;
      setTag(evenTags[tagIdx]);
      console.log(evenTags[tagIdx]);
      evenTags.splice(tagIdx, 1);
      sessionStorage.setItem('evenTags', JSON.stringify(evenTags));
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
      >
        <source src={ bgAudio } type="audio/mpeg" />
      </audio>

      <div className='result-page content'>
        <h1>
            {tag}
        </h1>
      </div>  
      
      <div className='result-page-button'>
        <button id="nextButton" onClick={() => navigate('/petal')}>{"已找到我的花朵 >>"}</button>
        <button id="backButton" onClick={() => navigate('/number')}>{"無法找到花朵"}</button>
      </div>
    </>
  );
};

export default ResultPage;