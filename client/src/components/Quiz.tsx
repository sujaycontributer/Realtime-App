import { useState } from 'react';

// Main App component to demonstrate the QuizOptions component
export default function Quiz() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelect, setIsSelect] = useState<boolean>(false);

  // Updated to have only four options
  const quizOptions = [   // have to add real questions from the quiz context
    'Mars',
    'Jupiter',
    'Earth is the third planet from the Sun.',
    'Neptune'
  ];

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setIsSelect(true);
    console.log(`Selected option: ${option}`);
  };

  return (
    <div className="bg-gray-100 max-h-screen p-4 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">Which planet is a home to human life?</h2>
        <QuizOptions 
          options={quizOptions} 
          isSelect={isSelect}
          onSelect={handleOptionSelect} 
          selectedOption={selectedOption} 
        />
      </div>
    </div>
  );
}


function QuizOptions({ options, onSelect, selectedOption, isSelect }:any) {
  // Use a responsive grid layout with 2 columns
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {(options as any).map((option: any, index: number) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          disabled={isSelect}
          className={`
            w-full py-16 px-4 text-left border-2 rounded-lg transition-all duration-300 text-lg
            ${selectedOption === option 
              ? 'bg-blue-600 border-blue-600 text-white font-semibold shadow-md' 
              : 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400'
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
