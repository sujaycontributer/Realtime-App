import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '@/lib/utils';
import api from '@/api/axios';

const CreateSet = () => {
  return (
    <div className="min-h-screen fixed top-0 left-0 md:left-[305px] bg-gray-100 flex items-center justify-center w-full p-4 font-sans">
      <div className="bg-white p-8 md:mr-[300px] rounded-xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4">Create problem set 🤡</h1>
        <p className="text-center text-gray-600 mb-3">
          Create the set and add problem in this set.
        </p>
        <Create />
      </div>
    </div>
  );
};


const Create = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCreateClick = async () => {
    const res = await api.post(`${BACKEND_URL}/problemset`, {
        "setName": inputValue
    });
    console.log(res.data);
    navigate(`/set/${res.data.problemSet.id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
       
        <label htmlFor="string-input" className="text-sm font-medium text-gray-700 mb-2">
          Enter a string:
        </label>
        <input
          id="string-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Type here..."
        />
      </div>

     
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-800">Current Input Value:</h3>
        <p className="text-blue-700 font-mono mt-2 break-all">{inputValue || <span className="text-gray-400 italic">...empty...</span>}</p>
      </div>

      <div
        onClick={handleCreateClick}
        className="mt-4 w-full text-center py-2 px-4 rounded-lg bg-blue-500 text-white font-bold cursor-pointer hover:bg-blue-600 transition-colors duration-200 shadow-md active:bg-blue-700 active:shadow-inner"
      >
        Create Problem Set
      </div>
    </div>
  );
};

export default CreateSet;
