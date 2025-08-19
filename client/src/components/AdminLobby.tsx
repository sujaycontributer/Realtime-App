import { useContext, useEffect, useRef, useState } from "react"
import { quizContext } from "../context/QuizDataProvider"
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import Quiz from "./Quiz";
import type {ProblemInterface} from "../types";
import ProblemSet from "./ProblemSet";
import Leaderboard from "./Leaderboad";


function AdminLobby() {
  const {roomId} = useParams();
  const {problems} = useContext(quizContext);
  const {socket} = useContext(SocketContext);
  const [currentProblem, setCurrentProblem] = useState<ProblemInterface | undefined>(undefined);
  const [isLeaderboad, setIsLeaderboad] = useState(false);
  const [data, setData] = useState<any>();
  const indexRef = useRef(0);

  useEffect(() => {
     setCurrentProblem(problems[0]);

     socket?.on('leaderboad', (data) => {
      setIsLeaderboad(true)
          console.log("hi")
          const totalUser = data.totalUser;
          const selectedA = data.selectedA;
          const selectedB = data.selectedB
          const selectedC = data.selectedC;
          const selectedD = data.selectedD
          const ans = data.ans;
          setData({
            A: selectedA,
            B: selectedB,
            C: selectedC,
            D: selectedD,
            totalUser: totalUser,
            ans: ans});
     });

     return () => {
      socket?.off('leaderboad')
    }
  }, [problems])

  const nextQuestionHandler = () => {
    if(indexRef.current + 1 < problems.length) {
      indexRef.current = indexRef.current + 1;
      setCurrentProblem(problems[indexRef.current]);
      setIsLeaderboad(false);
    }
  }

  const showQuestionHandler = () => { // trigger the emmit of current question
    setIsLeaderboad(false);
    socket?.emit('question-request', {
      roomId: roomId,
      problem: currentProblem
    });
  }

  const showLeaderBoadHandler = () => { // trigger the emmit of current question's leaderboard
    socket?.emit('show-leaderboad', {
      roomId: roomId,
      problem: currentProblem,
      
    } );
  }

  return (
    <div className={` bg-gray-100 h-screen md:w-full flex flex-col justify-center items-center `}>
        <div className={`${problems.length === 0 ? "block": "hidden"}`}>
          <ProblemSet roomExist={true}/>
        </div>

        <div className={`${problems.length > 0 ? "block ": "hidden"}`}>
          <section className={`mt-4 ${!isLeaderboad ? 'block': 'hidden'}`}>
          <Quiz question={currentProblem} />
          </section>

          <section className={`${isLeaderboad ? 'block': 'hidden' }`}>
            <Leaderboard data={data} />
          </section>
  
        
        <section className={`fixed bottom-14 md:bottom-10 left-1/2 -translate-x-1/2 flex justify-center bg-gray-100 items-center ${isLeaderboad? 'mt-3': 'mt-3'} gap-4 md:gap-10 p-2 md:h-[100px] w-full`}>
          <button 
          onClick={nextQuestionHandler}
          className="bg-gray-800 font-semibold text-gray-200 py-2  md:p-2  rounded-lg shadow-lg  hover:bg-gray-700">
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
