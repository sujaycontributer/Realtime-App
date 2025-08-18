import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import type {ProblemInterface} from '../types'
import Quiz from "./Quiz";
import Leaderboad from "./Leaderboad";

export default function ClinetLobby() {
    const {socket, connectSocket, disconnectSocket} = useContext(SocketContext);
    const [problem, setProblem] = useState<ProblemInterface >();
    const [isLeaderboad, setIsLeaderboad] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    console.log(problem)

    useEffect(() => {
        connectSocket();
        socket?.on('question', (question) => {
          setProblem(question.problem);
          setIsLeaderboad(false);
          console.log('Get the problem');
          console.log(problem);
        });
        socket?.on('leaderboad', (data) => {
          setIsLeaderboad(true);
          console.log("data is", data);
          const problem = data.problem;
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
            ans: ans

          });
        });


        return () => {
          socket?.off('question');
          socket?.off('leaderboad');
          disconnectSocket();
        }
    }, []);




  return (
    <div  className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      <div className={`${isLeaderboad ? "hidden": "block"}`}>
        <h1>Wait for admin to start ...</h1>
        <section className="mt-8">
          <Quiz question={problem} type="user" />
        </section>
      </div>
      <div className={`${isLeaderboad ? "block": "hidden"} mx-auto`}>
        <Leaderboad data={data}/>
      </div>
    </div>
  )
}

