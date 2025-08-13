import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { quizContext } from '../context/QuizDataProvider';

interface SetInterface {
    id: string;
    setName: string;
    problems: {
      id: string;
      problemSetId: string;
      problemName: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
    }[]
}

export default function ProblemSet() {
    const [problemSet, setProblemSet] = useState<SetInterface[]>([]);
    //@ts-ignore
    const {problems, setProblems} = useContext(quizContext);
    
    useEffect(() => {
      const getProblemSets = async () => {
        const problems = await axios.get('http://localhost:3000/problemset');
        // console.log(problems.data.problemSet);
        setProblemSet(problems.data.problemSet);
      }
      
      getProblemSets();

    }, []);

  return (
    <div className='bg-gray-200 max-w-2xl min-h-[400px] p-4 rounded-md'>
      <h1 className='p-2 text-xl font-serif font-semibold text-gray-800 text-center'>Choose your problem set</h1>
      <div className='max-h-[400px] flex flex-col gap-4 mt-4 overflow-y-scroll hide-scrollbar scroll-smooth'>
        {problemSet.length > 0 && problemSet.map((set:any) => <button key={set.id} className='text-neutral-200 transition-all duration-200 text-lg bg-gray-700 hover:bg-gray-800 py-6 rounded-lg' onClick={() => {
          setProblems(set.problem)
        } }> {set.setName} </button>)}
      </div>
    </div>
  )
}




