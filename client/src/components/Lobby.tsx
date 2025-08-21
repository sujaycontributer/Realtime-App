import { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';

export default function Lobby() {
  const { socket } = useContext(SocketContext);
  const [roomId, setRoomId] = useState<string>("");
  const navigate = useNavigate()


  const joinRoomHandler = () => {
    socket?.connect();

    socket?.emit('checkRoomExistence', roomId);

    socket?.on('room-status', (room) => {

      if (room.exists) {
        console.log(`Room is exists,And the room id is ${room.roomId}`);
        socket.emit('join-room', {
          socketId: socket.id,
          roomId: roomId
        });

        navigate(`/join/${roomId}`)
      } else {
        console.log(`This Room-id ${room.roomId} is not exists`);

      }
    });

  }


  return (
    <div className='fixed top-0 left-0 md:left-[305px] w-full h-screen  flex justify-center items-center bg-gray-200 p-4 text-black font-mono'>
      <div className='md:mr-[300px] flex flex-col items-center justify-center gap-4 p-4 w-[50%]'>
        <div>
          <h1 className='text-xl font-semibold text-neutral-800 ml-8'>Enter the code to join</h1>
          <input type="text" placeholder='12345678' className={`mt-4 px-4 py-3 w-[320px] rounded-xl border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200`} value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        </div>
        <button className='px-2  h-12 w-30 rounded-2xl cursor-pointer border-2 mx-auto border-violet-400' onClick={joinRoomHandler}>
          Join room
        </button>
      </div>
    </div>
  )
}

