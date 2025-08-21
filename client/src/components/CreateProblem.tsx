import { useForm, type SubmitHandler } from 'react-hook-form';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '@/lib/utils';

// Define the type for our form data
type FormData = {
  problemName: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  ansOption: 'A' | 'B' | 'C' | 'D'; // The answer will be one of these values
};

const CreateProblem = () => {
  const { setId } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('Form data submitted:', data);
    await axios.post(`${BACKEND_URL}/problem`, {
      problemSetId: setId,
      problemName: data.problemName,
      options: [data.optionA, data.optionB, data.optionC, data.optionD],
      ansOption: data.ansOption
    });
    reset();
    alert("Set created");
  };

  return (
    <div className="h-screen fixed top-0 left-0 md:left-[305px] w-full bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 md:-translate-x-1/2 rounded-2xl w-full max-w-lg border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Create Problem</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Problem Name Input */}
          <div>
            <label htmlFor="problemName" className="block text-sm font-semibold text-gray-700 mb-1">
              Problem Name
            </label>
            <input
              placeholder="e.g., What is the capital of France?"
              {...register("problemName", { required: true })}
              className={`w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-150 ${errors.problemName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
            />
            {errors.problemName && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
          </div>

          {/* Options A-D Inputs */}
          <div>
            <label htmlFor="optionA" className="block text-sm font-semibold text-gray-700 mb-1">Option A</label>
            <input
              placeholder="e.g., London"
              {...register("optionA", { required: true })}
              className={`w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-150 ${errors.optionA ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
            />
            {errors.optionA && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
          </div>
          <div>
            <label htmlFor="optionB" className="block text-sm font-semibold text-gray-700 mb-1">Option B</label>
            <input
              placeholder="e.g., Paris"
              {...register("optionB", { required: true })}
              className={`w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-150 ${errors.optionB ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
            />
            {errors.optionB && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
          </div>
          <div>
            <label htmlFor="optionC" className="block text-sm font-semibold text-gray-700 mb-1">Option C</label>
            <input
              placeholder="e.g., Berlin"
              {...register("optionC", { required: true })}
              className={`w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-150 ${errors.optionC ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
            />
            {errors.optionC && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
          </div>
          <div>
            <label htmlFor="optionD" className="block text-sm font-semibold text-gray-700 mb-1">Option D</label>
            <input
              placeholder="e.g., Rome"
              {...register("optionD", { required: true })}
              className={`w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-150 ${errors.optionD ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
            />
            {errors.optionD && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
          </div>

          {/* Correct Answer Radio Buttons */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correct Answer
            </label>
            <div className="flex justify-between space-x-4">
              {['A', 'B', 'C', 'D'].map((option) => (
                <label key={option} className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    value={option}
                    {...register("ansOption", { required: true })}
                    className="sr-only peer"
                  />
                  <div
                    className="w-full text-center py-3 px-4 rounded-lg border border-gray-300 font-medium transition-colors duration-200 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-transparent hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {option}
                  </div>
                </label>
              ))}
            </div>
            {errors.ansOption && <span className="text-red-500 text-sm mt-1 block">Please select the correct answer</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProblem;