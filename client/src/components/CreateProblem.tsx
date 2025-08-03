import { useForm, type SubmitHandler } from 'react-hook-form';
import axios from 'axios'

// Define the type for our form data
type FormData = {
  problemName: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
};

// Main App component containing the form
const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // This function will be called with your valid form data     const {problemSetId, problemName, options} = req.body;

    console.log('Form data submitted:', data);
    await axios.post('http://localhost:3000/problem', {
      problemSetId: "e921bfe0-9341-426f-8df4-d17f05b0055a",
      problemName: data.problemName,
      options: [data.optionA, data.optionB, data.optionC, data.optionC]
    });
    alert("Set created");

  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl  w-full max-w-lg border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Create Problem</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Problem Name Input with validation */}
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

          {/* Option A Input with validation */}
          <div>
            <label htmlFor="optionA" className="block text-sm font-semibold text-gray-700 mb-1">
              Option A
            </label>
            <input
              placeholder="e.g., London"
              {...register("optionA", { required: true })}
              className={`w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-150 ${errors.optionA ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
            />
            {errors.optionA && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
          </div>

          {/* Option B Input with validation */}
          <div>
            <label htmlFor="optionB" className="block text-sm font-semibold text-gray-700 mb-1">
              Option B
            </label>
            <input
              placeholder="e.g., Paris"
              {...register("optionB", { required: true })}
              className={`w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-150 ${errors.optionB ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
            />
            {errors.optionB && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
          </div>

          {/* Option C Input with validation */}
          <div>
            <label htmlFor="optionC" className="block text-sm font-semibold text-gray-700 mb-1">
              Option C
            </label>
            <input
              placeholder="e.g., Berlin"
              {...register("optionC", { required: true })}
              className={`w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-150 ${errors.optionC ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
            />
            {errors.optionC && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
          </div>

          {/* Option D Input with validation */}
          <div>
            <label htmlFor="optionD" className="block text-sm font-semibold text-gray-700 mb-1">
              Option D
            </label>
            <input
              placeholder="e.g., Rome"
              {...register("optionD", { required: true })}
              className={`w-full px-4 py-2 bg-gray-50 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-150 ${errors.optionD ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
            />
            {errors.optionD && <span className="text-red-500 text-sm mt-1 block">This field is required</span>}
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

export default App;
