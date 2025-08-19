import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { albumsData, assets, songsData } from '../assets/assets';

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumDate = albumsData[id];
  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumDate.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumDate.name}</h2>
          <h4 className="">{albumDate.desc}</h4>
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
      {songsData.map((item, index) => {
        return (
          <div
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
