import { createContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBar = useRef();
  const seekBg = useRef();
  const url = 'http://localhost:4000';

  const [songsData, setSongsData] = useState([]);
  const [albumData, setAlbumData] = useState([]); // Исправлено: albumData вместо albumsData
  const [track, setTrack] = useState(null); // Исправлено: null вместо songsData[0]
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) => {
    if (songsData.length > id) {
      await setTrack(songsData[id]);
      if (audioRef.current) {
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const previous = async () => {
    if (track && track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      if (audioRef.current) {
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const next = async () => {
    if (track && track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      if (audioRef.current) {
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const seekSong = (e) => {
    if (audioRef.current && seekBar.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBar.current.offsetWidth) * audioRef.current.duration;
    }
  };

  const getSongsData = async () => {
    try {
      const res = await axios.get(`${url}/api/song/list`);
      if (res.data && res.data.data) {
        const songsWithId = res.data.data.map((song, index) => ({
          ...song,
          id: index
        }));
        setSongsData(songsWithId);
        if (songsWithId.length > 0) {
          setTrack(songsWithId[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAlbumData = async () => {
    try {
      const res = await axios.get(`${url}/api/album/list`);
      if (res.data && res.data.data) {
        setAlbumData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      const updateTime = () => {
        if (audioRef.current && seekBg.current) {
          const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          seekBg.current.style.width = `${Math.floor(progress)}%`;
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
        }
      };

      audioRef.current.addEventListener('timeupdate', updateTime);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateTime);
        }
      };
    }
  }, []);

  useEffect(() => {
    getAlbumData();
    getSongsData();
  }, []);

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
    url,
    albumData, // Исправлено: albumData вместо albumsData
    songsData,
  };

  return <PlayerContext.Provider value={contextValue}>{props.children}</PlayerContext.Provider>;
};

export default PlayerContextProvider;