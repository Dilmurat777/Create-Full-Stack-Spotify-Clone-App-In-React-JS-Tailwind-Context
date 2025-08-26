import { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState('#000000');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('bgColor', color);

      const response = await axios.post(`${url}/api/album/add`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setImage(false);
        setName('');
        setDesc('');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Occured', error.message);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 border-4 border-gray-400 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={submitHandler} className="flex flex-col gap-8 items-start">
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <label htmlFor="image" className="cursor-pointer">
          <input
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
            type="file"
            accept="image/*"
            hidden
          />
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
            className="w-24"
          />
        </label>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Tape here"
          className="bg-transparent outline-blue-400 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          placeholder="Tape here"
          className="bg-transparent outline-blue-400 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Background Color</p>
        <input onChange={(e) => setColor(e.target.value)} value={color} type="color" />
      </div>
      <button type="submit" className="bg-black text-white py-2.5 px-14 text-base cursor-pointer">
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
