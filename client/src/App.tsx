
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {io, Socket} from 'socket.io-client';

export default function App() {
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
    <div className='w-full flex justify-center items-center bg-gray-200 h-screen p-4 text-black font-mono'>
        <div className='flex flex-col items-center gap-4  p-4 w-[50%]'>

                 <div>
                      <h1 className='text-xl font-semibold text-neutral-800 ml-8'>Enter the code to join</h1>
                      <input type="text" placeholder='12345678' className={`mt-4 px-4 py-3 w-[320px] rounded-xl border-2 focus:border-amber-700`} />
                 </div>
                    <button className='px-2 h-12 w-30 rounded-2xl cursor-pointer border-2 mx-auto border-violet-400 border-' 
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
    </div>
  )
}


