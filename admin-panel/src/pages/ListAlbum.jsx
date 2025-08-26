import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../App";


const ListAlbum = () => {
 const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlbum = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error Occur');
    }
    setLoading(false);
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbum();
      }
    } catch (error) {
      console.error(error);
      toast.error('Error Occur');
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-blue-800 rounded-full text-blue-500 animate-spin"></div>
    </div>
  ) : (
    <div>
      <h1 className="text-center mb-5">All Song List</h1>
      <hr />
      <div>
        <div className="sm:grid hidden sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center mt-3 mr-5 bg-blue-100 p-3 border border-gray-500 rounded text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 mt-1">
              <img className="w-10" src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
				<input type="color" value={item.bgColor} readOnly />
              <p
                onClick={() => removeSong(item._id)}
                className="cursor-pointer ml-1 p-1 bg-gray-500 text-white w-7 h-7 line-hei flex items-center justify-center rounded-full leading-[3.5px] hover:bg-orange-500">
                {' '}
                &times;
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListAlbum
