import { useEffect, useMemo, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

export default function Admin() {
  const [roomId, setRoomId] = useState<string>("");
  const [message, setMessage] = useState("");

  // Use a ref to hold the latest roomId value
  const roomIdRef = useRef(roomId);
  // Keep the ref's value in sync with the state
  useEffect(() => {
    roomIdRef.current = roomId;
  }, [roomId]);

  const socket: Socket = useMemo(() => {
    return io('http://localhost:3000', {
      autoConnect: false
    });
  }, []);

  // Use useEffect with an empty dependency array for a single listener
  useEffect(() => {
    socket.on('room-status', (room) => {
      if (!room.exits) {
        console.log("Room is not exist");
        socket.emit('join-room', {
          id: socket.id,
          name: "sujay",
          type: "admin",
          // Access the value from the ref, which is always current
          roomId: roomIdRef.current
        });
      }
    });

    return () => {
      socket.off('room-status');
    };
  }, [socket]); // Now the dependency array is just [socket]

  const JoinHandler = () => {
    socket.disconnect();
    socket.connect();
    console.log('Join click');
    socket.emit('checkRoomExistence', roomId);
  };

  socket.on('message', (message) => {
    console.log(message)
    setMessage(message.message);
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
                      <input type="text" placeholder='459q3432fsf' className={`mt-4 px-4 py-3 w-[320px] rounded-xl border-2 focus:border-amber-700`} value={roomId} onChange={(e:any) => setRoomId(e.target.value)}/>
                 </div>
                <button className='px-2 h-12 w-30 rounded-2xl cursor-pointer border-2 mx-auto border-violet-400' onClick={JoinHandler}>
                    Create room
                </button>
        </div>
    </div>
  )
}
