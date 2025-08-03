import axios from 'axios'
import { useEffect, useState } from 'react'

interface SetInterface {
    id: string;
    setName: string;
}

export default function ProblemSet() {
    const [problemSet, setProblemSet] = useState<SetInterface[]>([]);

    useEffect(() => {
      const getProblemSets = async () => {
        const problems = await axios.get('http://localhost:3000/problemset');
        console.log(problems.data.problemSet);
        setProblemSet(problems.data.problemSet);
      }
      
      getProblemSets();

    }, []);

  return (
    <div className='bg-neutral-800'>
        <h1>Hi</h1>
        {problemSet.length > 0 && problemSet.map((set:any, index) =>  <div key={set.id} className='text-white text-4xl'> {set.setName} </div>)}
    </div>
  )
}




