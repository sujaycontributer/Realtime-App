import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { SocketContext } from "../context/SocketContext";
import type {ProblemInterface} from '../types'
import Quiz from "./Quiz";

export default function ClinetLobby() {
    const {roomId} = useParams();
    const {socket, connectSocket, disconnectSocket} = useContext(SocketContext);
    const [problem, setProblem] = useState<ProblemInterface >();
    console.log(problem)

    useEffect(() => {
        connectSocket();
        socket?.on('question', (question) => {
          setProblem(question.problem);
          console.log('Get the problem');
          console.log(problem);
        });
        socket?.on('show-leaderboad', (data) => {

        });


        return () => {
          socket?.off('question');
          socket?.off('show-leaderboad');
          disconnectSocket();
        }
    }, []);




  return (
    <div  className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      <h1>Wait for admin to start ...</h1>
      <section className="mt-8">
        <Quiz question={problem} type="user" />
      </section>
    </div>
  )
}

