
import Navbar from './Navbar';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { useState } from 'react';
import { useEffect } from 'react';


const DisplayAlbum = ({ albumId, album }) => {
  const { playWithId, songsData, albumData } = useContext(PlayerContext);
  const [currentAlbum, setCurrentAlbum] = useState(null);

  useEffect(() => {
    if (albumData && albumId) {
      const foundAlbum = albumData.find(item => item._id === albumId);
      setCurrentAlbum(foundAlbum);
    }
  }, [albumData, albumId]);

  if (!currentAlbum) {
    return <div className="text-white">Загрузка альбома...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={currentAlbum.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{currentAlbum.name}</h2>
          <h4 className="">{currentAlbum.desc}</h4>
          <div className="mt-1">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
            <b> Spotify </b>- 2,134,123 Likes - <b> 50 songs, </b>- about 2 hr 30 min
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#7a7a7a]">
        <p className="mr-4">
          <b>#</b> Title
        </p>
        <p className='m-auto sm:m-0'>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {songsData.filter((item) => item.album === album.name).map((item, index) => {
        return (
          <div
            onClick={() => playWithId(item.id)}
            key={index}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#7a7a7a] hover:bg-[#ffffff2b] cursor-pointer">
            <div className="flex items-center text-white">
              <b className="mr-2">{item.id + 1}</b>
              <img className="inline w-8 mr-2 sm:w-10 sm:mr-5" src={item.image} alt="" />
              <p>{item.name}</p>
            </div>
            <p className='text-[12px] sm:text-[15px] flex gap-2 flex-col m-auto sm:m-0 sm:flex-row'>Happy <span> favorite</span></p>
            <p className='text-[12px] sm:text-[15px] hidden sm:block'>5 das ago</p>
            <p className="text-[12px] sm:text-[15px] m-auto">{item.duration}</p>
          </div>
        );
      })}
    </>
  );
};

export default DisplayAlbum;