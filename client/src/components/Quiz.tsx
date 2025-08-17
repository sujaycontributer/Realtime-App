import { useContext, useState } from 'react';
import type {ProblemInterface} from '../types'
import { SocketContext } from '../context/SocketContext';


export default function Quiz({question, type}: {
  question?: ProblemInterface | undefined,
  type?: string
} ) {
  const {socket} = useContext(SocketContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelect, setIsSelect] = useState<boolean>(false);

  const quizOptions = [  
    {option: question?.optionA, id: "A"},
    {option: question?.optionB, id: "B"},
    {option: question?.optionC, id: "C"},
    {option: question?.optionD, id: "D"} 
  ];


  const handleOptionSelect = (option: any) => {
    
    if(type === "user") {
      setSelectedOption(option);
      setIsSelect(true);
      socket?.emit('submission', {
      socketId: socket?.id,
      selectedId: option,
      problemId: question?.id,
      ans: question?.ans,
      problem: question
    });
    }
    console.log(`Selected option: ${option}`);
  };

  return (
    <div className="bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">{question?.problemName}</h2>
        <QuizOptions 
          options={quizOptions} 
          isSelect={isSelect}
          onSelect={handleOptionSelect} 
          selectedOption={selectedOption} 
          type={type}
        />
      </div>
    </div>
  );
}


function QuizOptions({ options, onSelect, selectedOption, isSelect, type }:any) {
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {(options as any).map((optionObj: any, index: number) => (
        <button
          key={index}
          onClick={() => onSelect(optionObj.id)}
          disabled={type === "user" ? isSelect : false}
          className={`
            w-full py-10 md:py-16 px-6 text-left border-2 rounded-lg transition-all duration-300 text-lg
            ${selectedOption === optionObj.id 
              ? 'bg-blue-600 border-blue-600 text-white font-semibold shadow-md' 
              : 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400'
            }
            ${type === "user" ? "px-16": ""}
          `}
        >
          {optionObj.option}
        </button>
      ))}
    </div>
  );
}
