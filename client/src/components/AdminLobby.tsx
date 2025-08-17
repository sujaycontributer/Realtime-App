import { useContext, useEffect, useRef, useState } from "react"
import { quizContext } from "../context/QuizDataProvider"
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import Quiz from "./Quiz";
import type {ProblemInterface} from "../types";
import ProblemSet from "./ProblemSet";


function AdminLobby() {
  const {roomId} = useParams();
  const {problems} = useContext(quizContext);
  const {socket} = useContext(SocketContext);
  // console.log(problems)
  // const checkProblem = problems.length > 0 ? problems[0] : undefined;
  // console.log(checkProblem)
  const [currentProblem, setCurrentProblem] = useState<ProblemInterface | undefined>(undefined);
  const indexRef = useRef(0);

  useEffect(() => {
    setCurrentProblem(problems[0]);
  }, [problems])

  const nextQuestionHandler = () => {
    if(indexRef.current + 1 < problems.length) {
      indexRef.current = indexRef.current + 1;
      setCurrentProblem(problems[indexRef.current]);
    }
  }

  const showQuestionHandler = () => { // trigger the emmit of current question
    socket?.emit('question-request', {
      roomId: roomId,
      problem: currentProblem
    });
  }

  const showLeaderBoadHandler = () => { // trigger the emmit of current question's leaderboard
    socket?.emit('show-leaderboad', {
      roomId: roomId,
      problem: currentProblem,
      
    } )
  }

  return (
    <div className={` bg-gray-100 min-h-screen w-full flex flex-col justify-center items-center `}>
        <div className={`${problems.length === 0 ? "block": "hidden"}`}>
          <ProblemSet roomExist={true}/>
        </div>

        <div className={`${problems.length > 0 ? "block": "hidden"}`}>
          <h1 className="text-md text-center p-2 ">Wait for admin to start ...</h1>
          <section className="mt-8">
          <Quiz question={currentProblem} />
          </section>
  
        <section className="flex justify-center items-center mt-14 md:mt-0 gap-10 p-2 h-[100px]">
          <button 
          onClick={nextQuestionHandler}
          className="bg-gray-800 font-semibold text-gray-200 py-2  md:p-2 rounded-lg shadow-lg  hover:bg-gray-700">
            Next question
          </button>
            
          <button
          onClick={showQuestionHandler} 
          className="bg-gray-800 font-semibold text-gray-200 shadow-lg py-2 md:p-2 rounded-lg hover:bg-gray-700">
            Show question
          </button>
            
          <button 
          onClick={showLeaderBoadHandler}
          className="bg-green-700 font-semibold text-gray-200 shadow-lg py-2  md:p-2 rounded-lg hover:bg-gray-700">
            Show leaderboad
          </button>
        </section>
        </div>
    </div>
  )
}

export default AdminLobby
