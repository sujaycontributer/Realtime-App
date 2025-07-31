import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {io, Socket} from 'socket.io-client';

export default function Lobby() {
//   const [socketId, setSocketId] = useState<string | undefined>(undefined);
//   const [toSend, setToSend] = useState<string | undefined>();
const [roomId, setRoomId] = useState<string>("");

  const socket: Socket = useMemo(() => {
    return io('http://localhost:3000', {
      autoConnect: false
    });
    
  }, []); 

  const joinRoomHandler = () => {
    socket.connect();

    socket.emit('checkRoomExistence', roomId);

    socket.on('room-status', (room) => {

      if(room.exists) {
        console.log(`Room is exists,And the room id is ${room.roomId}`);
        socket.emit('join-room', {
          id: socket.id,
          roomId: roomId 
        });
      } else console.log(`This Room-id ${room.roomId} is not exists`);
    });

  } 
  

  return (
    <div className='w-full flex justify-center items-center bg-gray-200 h-screen p-4 text-black font-mono'>
        <div className='flex flex-col items-center gap-4  p-4 w-[50%]'>
                 <div>
                      <h1 className='text-xl font-semibold text-neutral-800 ml-8'>Enter the code to join</h1>
                      <input type="text" placeholder='12345678' className={`mt-4 px-4 py-3 w-[320px] rounded-xl border-2 focus:border-amber-700`} value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                 </div>
                <button className='px-2 h-12 w-30 rounded-2xl cursor-pointer border-2 mx-auto border-violet-400' onClick={joinRoomHandler}>
                    Join room
                </button>
        </div>
    </div>
  )
}

