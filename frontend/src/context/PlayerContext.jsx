import { createContext, useEffect, useRef, useState } from 'react';
import { songsData } from '../assets/assets';
// import axios from './../../node_modules/axios/lib/axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBar = useRef();
  const seekBg = useRef();
  
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });
  // const [listAlbum, setListAlbum] = useState([]);
  // const [listSong, setListSong] = useState([]);
  const url = 'http://localhost:4000'; 

  // const fetchListAlbum = async () => {
  //   const res = await axios.get(`${url}/api/album/list`);
  //   setListAlbum(res.data.data)
  // }
  // const fetchListSong = async () => {
  //   const res = await axios.get(`${url}/api/song/list`);
  //   setListSong(res.data.data)
  // }





  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };
  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
	};
	
	const seekSong = (e) => {
		audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBar.current.offsetWidth) * audioRef.current.duration)
		
  }
  
  // useEffect(() => {
  //   fetchListAlbum()
  //   fetchListSong()
  // }, [])

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBg.current.style.width =
          Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100) + '%';
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    play,
    pause,
    track,
    setTrack,
    playStatus,
    time,
    setTime,
    playWithId,
    previous,
	  next,
    seekSong,
    // listAlbum,
    // listSong,
    url
  };

  return <PlayerContext.Provider value={contextValue}>{props.children}</PlayerContext.Provider>;
};

export default PlayerContextProvider;
