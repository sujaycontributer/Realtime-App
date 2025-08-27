import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import type {ProblemInterface} from '../types'
import Quiz from "./Quiz";
import Leaderboad from "./Leaderboad";
import { LoaderFive } from "./ui/loader";

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
    <div  className="min-h-screen fixed top-0 left-0 md:left-[305px] w-full flex flex-col justify-center items-center bg-gray-100">
      <div className={`${!problem ? "block": "hidden"} md:mr-[400px] flex justify-center`}><LoaderFive  text="Wait for admin to start ..."/></div>
      <div className={`${isLeaderboad ? "hidden": "block"}`}>
        <section className={`${!problem ? "hidden": "block"} mt-8`}>
          <Quiz question={problem} type="user" />
        </section>
      </div>
      <div className={`${isLeaderboad ? "block": "hidden"} mx-auto`}>
        <section>
        <Leaderboad data={data}/>
        </section>
        
      </div>
    </div>
  )
}

