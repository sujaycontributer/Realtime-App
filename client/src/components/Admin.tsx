import { useContext, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const {socket, connectSocket} = useContext(SocketContext);
  const [roomId, setRoomId] = useState<string>("");
  const [message, setMessage] = useState("");

  // Use a ref to hold the latest roomId value
  const roomIdRef = useRef<HTMLInputElement | null>(null); 
  const navigate = useNavigate();

   
  socket?.on('room-status', (room) => {
      if (!room.exits) {
        console.log("Room is not exist");
        socket.emit('join-room', {
          id: socket.id,
          name: "sujay",
          type: "admin",
          roomId: roomIdRef.current?.value
        });
        navigate(`/admin/${roomIdRef.current?.value}`);


      }
  });

  const onchangeHandler = (e:any) => {
    if(roomIdRef.current) {
      roomIdRef.current.value = e.target.value;
    }
  }

  const JoinHandler = () => {
    connectSocket();
    console.log('Join click');
    socket?.emit('checkRoomExistence', roomId);
  };

  socket?.on('message', (newMessage) => {
    setMessage(newMessage.message);

    setTimeout(() => {
      setMessage("");
    }, 1000);
  });

  return (
    <div className='w-full flex justify-center items-center bg-gray-200 h-screen p-4 text-black font-mono'>
      {message.length > 0 && <h1 className="text-green-400 text-4xl transition-all ease-in-out  fixed top-10">{message}</h1>}
        <div className='flex flex-col items-center gap-4  p-4 w-[50%]'>
                 <div>
                      <h1 className='text-xl font-semibold text-neutral-800 ml-8'>Create the room  </h1>
                      <input type="text" placeholder='459q3432fsf' className={`mt-4 px-4 py-3 w-[320px] rounded-xl border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200`} ref={roomIdRef}  onChange={onchangeHandler} />
                 </div>
                <button className='px-2 h-12 w-30 rounded-2xl cursor-pointer border-2 mx-auto border-violet-400' onClick={JoinHandler}>
                    Create room
                </button>
        </div>
    </div>
  )
}
