import { createContext } from 'react';

const AudioContext = createContext({
  isMuted: false,
  setIsMuted: () => {},
  audioRef: null,
  videoRef: null,
});

export default AudioContext;