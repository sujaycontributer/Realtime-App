
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {io, Socket} from 'socket.io-client';

export default function App() {
  const [message, setMessage] = useState("");
  const [socketId, setSocketId] = useState<string | undefined>(undefined);
  const socket: Socket = useMemo(() => {
    return io('http://localhost:3000', {
      autoConnect: false
    });
  }, []); 

  const handler = (e:FormEvent) => {
    e.preventDefault();
    socket?.emit('message', {
      message: message
    })

  }
  // socket.emit('greetings', {
  //   message: "Hi there"
  // });

  useEffect(() => {
    socket.connect(); // now the connection is stabilized

    socket.on("connect", () => { // on connection something is this will happen
      setSocketId(socket.id);
      
    });

  },[socket]);
  

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


