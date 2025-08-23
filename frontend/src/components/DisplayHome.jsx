import { albumsData, songsData } from '../assets/assets';
import AlbumItem from './AlbumItem';
import Navbar from './Navbar';
import SongItem from './SongItem';


const DisplayHome = () => {
  
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="font-bold text-2xl my-5">Featured charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              image={item.image}
              name={item.name}
              id={item.id}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="font-bold text-2xl my-5">Featured charts</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, index) => (
            <SongItem
              key={index}
              image={item.image}
              name={item.name}
              id={item.id}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
