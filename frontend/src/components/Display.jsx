import { useEffect, useRef } from 'react';
import DisplayAlbum from './DisplayAlbum';
import DisplayHome from './DisplayHome';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const Display = () => {
  const { albumData } = useContext(PlayerContext);
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes('album');
  const albumId = isAlbum ? location.pathname.split('/').pop() : '';
  
  // Безопасное получение bgColor
  const album = albumData.find((x) => x._id == albumId);
  const bgColor = album ? album.bgColor : '#121212';

  useEffect(() => {
    if (displayRef.current) {
      if (isAlbum) {
        displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
      } else {
        displayRef.current.style.background = `#121212`;
      }
    }
  }, [isAlbum, bgColor]);

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route
          path="/album/:id"
          element={<DisplayAlbum albumId={albumId} album={album} />}
        />
      </Routes>
    </div>
  );
};

export default Display;