
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
     <button className='px-4 py-2 cursor-pointer' 
      onClick={() => {
        socket.emit('submission', {
          id: socket.id,
          problemId: 0,
          selectedId: 1
        });
      }}>
      Join room
     </button>

    </div>
  )
}


