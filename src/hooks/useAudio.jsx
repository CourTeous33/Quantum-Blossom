import { useEffect, useRef, useState } from 'react';

export const useAudio = ({ src, autoPlay = false, loop = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState<boolean>(autoPlay);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = src;
      if (autoPlay) {
        audioRef.current.play().catch((error) => 
          console.log("Audio autoplay failed:", error)
        );
      }
    }
  }, [src, autoPlay]);

  const toggle = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => 
        console.log("Audio play failed:", error)
      );
    }
    setPlaying(!playing);
  };

  return { playing, toggle, audioRef };
};