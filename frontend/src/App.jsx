import Player from './components/Player';
import Sidebar from './components/Sidebar';
import Display from './components/Display';
import { useContext } from 'react';
import { PlayerContext } from './context/PlayerContext';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);
  
  return (
    <div className="h-screen bg-black">
      {songsData.length > 0 && track ? (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-white">
          Загрузка данных...
        </div>
      )}
      <audio ref={audioRef} preload="auto" src={track ? track.file : null} />
    </div>
  );
};

export default App;