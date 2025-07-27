
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {io, Socket} from 'socket.io-client';

export default function App() {
  const [message, setMessage] = useState("");
  const [socketId, setSocketId] = useState<string | undefined>(undefined);
  const [toSend, setToSend] = useState<string | undefined>();
  const socket: Socket = useMemo(() => {
    return io('http://localhost:3000', {
      autoConnect: false
    });
  }, []); 

  const handler = (e:FormEvent) => {
    e.preventDefault();
    socket?.emit('message', {
      message: message,
      toSend: toSend
      
    })

  }

  useEffect(() => {
    socket.connect(); // now the connection is build

  },[socket]);

  socket.on("connect", () => { // on connection something will happen here
    setSocketId(socket.id);

        socket.on('receive', (data) => {
          console.log(data.message);
        });
        socket.on('New user join', (msg) => {
          console.log(msg);
        });
      
    });

  return (
    <div className='w-full bg-black h-screen p-4 text-white'>
      <span>Socket id: {socketId} </span>  
      <form onSubmit={handler} className='flex gap-2'>
        <input className='bg-white text-black p-2 items-center ' type="text" name="" value={message} placeholder='Type message' onChange={(e) => setMessage(e.target.value)} />
        <label htmlFor="" className='ml-4 flex gap-4 text-white '>
          <span>to</span> 
          <input type="text" name="" value={toSend} onChange={e=> setToSend(e.target.value)} placeholder='Socket id' className='p-3' />
        </label>
        <button className='p-2'>Send</button>
      </form>

    </div>
  )
}


