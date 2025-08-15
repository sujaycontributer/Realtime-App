import { useContext, useRef, useState } from "react"
import { quizContext } from "../context/QuizDataProvider"
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import Quiz from "./Quiz";
import type {ProblemInterface} from "../types";


function AdminLobby() {
  const {roomId} = useParams();
  const {problems} = useContext(quizContext);
  const {socket} = useContext(SocketContext);
  const [currentProblem, setCurrentProblem] = useState<ProblemInterface | {}>({});
  const indexRef = useRef(0);

  const nextQuestionHandler = () => {
    if(indexRef.current + 1 < problems.length) {
      indexRef.current = indexRef.current + 1;
      setCurrentProblem(problems[indexRef.current]);
    }
  }

  const showQuestionHandler = () => { // trigger the emmit of current question
    socket?.emit('question', {
      problem: currentProblem
    });
  }

  const showLeaderBoadHandler = () => { // trigger the emmit of current question's leaderboard
    
  }

  return (
    <div className={` bg-gray-100 min-h-screen w-full `}>
        <h1 className="text-md text-center p-2 ">Wait for admin to start ...</h1>

        <section className="mt-8">
          <Quiz />
        </section>
  
        <section className="flex justify-center items-center gap-10 p-2 h-[100px]">
          <button 
          onClick={nextQuestionHandler}
          className="bg-gray-800 font-semibold text-gray-200 md:p-2 rounded-lg shadow-lg  hover:bg-gray-700">
            Next question
          </button>
            
          <button
          onClick={showQuestionHandler} 
          className="bg-gray-800 font-semibold text-gray-200 shadow-lg md:p-2 rounded-lg hover:bg-gray-700">
            Show question
          </button>
            
          <button 
          onClick={showLeaderBoadHandler}
          className="bg-green-700 font-semibold text-gray-200 shadow-lg md:p-2 rounded-lg hover:bg-gray-700">
            Show leaderboad
          </button>
        </section>
    </div>
  )
}

export default AdminLobby
