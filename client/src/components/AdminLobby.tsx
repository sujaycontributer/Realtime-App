import { useContext, useState } from "react"
import { quizContext } from "../context/QuizDataProvider"
import  type {ProblemInterface} from "../types";
import Quiz from "./Quiz";

function AdminLobby() {
  const {problems} = useContext(quizContext);
  const [currentProblem, setCurrentProblem] = useState<ProblemInterface | {}>({});

  return (
    <div className={` bg-gray-100 min-h-screen w-full `}>
        <h1 className="text-md text-center p-2 ">Wait for admin to start ...</h1>

        <section className="mt-8">
          <Quiz />
        </section>
  
        <section className="flex justify-center items-center gap-10 h-[100px]">
          <button className="bg-gray-800 font-semibold text-gray-200 p-2 rounded-lg shadow-lg  hover:bg-gray-700">
            Next question
          </button>
            
          <button className="bg-gray-800 font-semibold text-gray-200 shadow-lg p-2 rounded-lg hover:bg-gray-700">
            Show question
          </button>
            
          <button className="bg-green-700 font-semibold text-gray-200 shadow-lg p-2 rounded-lg hover:bg-gray-700">
            Show leaderboad
          </button>
        </section>
    </div>
  )
}

export default AdminLobby
