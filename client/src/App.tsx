
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

  const SendToIndivisual = (e: FormEvent) => {
    
  }
  // socket.emit('greetings', {
  //   message: "Hi there"
  // });

  useEffect(() => {
    socket.connect(); // now the connection is build

    socket.on("connect", () => { // on connection something will happen here
      setSocketId(socket.id);
      
    });
    
   
    

  },[socket]);
  

   socket.on('New user join', (msg) => {
      console.log(msg);
    });
  

  return (
    <div className='w-full bg-black h-screen p-4 text-white'>
      <span>Socket id: {socketId} </span>  
      <form action="" onSubmit={handler} className='flex gap-2'>
        <input className='bg-white text-black p-2 items-center ' type="text" name="" value={message} placeholder='Type message' onChange={(e) => setMessage(e.target.value)} />
        <button className='p-2'>Send</button>
      </form>


      {/* <div className='mt-4'>
        <form onSubmit={SendToIndivisual} className='flex gap-4' >
        <input type="text" name="" id="" placeholder='Type message'  className='bg-white p-2 text-black' />
        <button>Send to </button>
        <input type="text" name="" id="" placeholder='Socket id'  className='bg-white p-2 text-black' />
      </form>
      </div> */}
    </div>
  )
}


