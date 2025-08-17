import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { quizContext } from '../context/QuizDataProvider';
import { useNavigate } from 'react-router-dom';

interface Problem {
  id: string;
  problemSetId: string;
  problemName: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

interface SetInterface {
  id: string;
  setName: string;
  problems: Problem[];
}

interface QuizContextType {
  problems: Problem[];
  setProblems: (problems: Problem[]) => void;
}

export default function ProblemSet({roomExist}: {roomExist?:boolean}) {
  const [problemSets, setProblemSets] = useState<SetInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { setProblems } = useContext(quizContext) as QuizContextType;

  useEffect(() => {
    const getProblemSets = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/problemset');
        if (response.data && response.data.problemSet) {
          setProblemSets(response.data.problemSet);
        } else {
          setError('Invalid data format from API.');
        }
      } catch (err) {
        setError('Failed to fetch problem sets. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    getProblemSets();
  }, []);

  const handleSelectSet = (problems: Problem[], id: string) => {
    if(roomExist) setProblems(problems);
    else {
      navigate(`/set/${id}`);
    }
  };

  return (
    <div className='bg-white max-w-2xl min-h-[400px] p-6 rounded-3xl shadow-lg'>
      <h1 className='p-2 text-3xl font-bold font-sans text-gray-900 text-center mb-6 tracking-wide'>
        Choose Your Problem Set
      </h1>
      
      <div className='max-h-[400px] flex flex-col gap-5 mt-4 overflow-y-scroll hide-scrollbar scroll-smooth'>
        {loading && <p className='text-center text-gray-600'>Loading problem sets...</p>}
        {error && <p className='text-center text-red-500 font-medium'>Error: {error}</p>}
        
        {!loading && !error && problemSets.length === 0 && (
          <p className='text-center text-gray-600'>No problem sets available.</p>
        )}
        
        {!loading && problemSets.length > 0 && problemSets.map((set) => (
          <button
            key={set.id}
            className='
              text-gray-800 transition-all duration-300 text-xl font-medium 
              py-6 rounded-2xl shadow-md
              bg-gradient-to-r from-pink-100 to-blue-100
              hover:from-pink-200 hover:to-blue-200 
              hover:shadow-xl hover:scale-[1.01]
              active:scale-[0.98]
              focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
            '
            onClick={() => handleSelectSet(set.problems, set.id)}
          >
            {set.setName}
          </button>
        ))}
      </div>
    </div>
  );
}



