
import { useEffect, useMemo, useState } from 'react';
import {io} from 'socket.io-client';

export default function App() {
  const [message, setMessage] = useState("");
  const [socketId, setSocketId] = useState<string | undefined>("");
  const socket = useMemo(() => io('http://localhost:3000'), []);
  

  const handler = () => {
    socket.emit('message', {
      message: message
    })
  }
  // socket.emit('greetings', {
  //   message: "Hi there"
  // });

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      
    })
  },[]);

  return (
    <div className='w-full bg-black h-screen p-4 text-white'>
      <span>Socket id: {socketId} </span>  
      <form action="" onSubmit={handler} className='flex gap-2'>
        <input className='bg-white text-black p-2 items-center ' type="text" name="" value={message} placeholder='Type message' onChange={(e) => setMessage(e.target.value)} />
        <button className='p-2'>Send</button>
      </form>
    </div>
  )
}


