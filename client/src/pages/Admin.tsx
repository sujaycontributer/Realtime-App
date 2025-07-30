import { useMemo } from "react";
import { io, type Socket } from "socket.io-client";

function Admin() {
     const socket: Socket = useMemo(() => {
    return io('http://localhost:3000', {
      autoConnect: false
    });
  }, []);


  return (
    <div>
       <label htmlFor="">Create room</label>
       <input type="text" name="" id="" />
       <button 
        onClick={() => {
                socket.emit('join-room', {
                    roomId: 123,
                    id: socket.id,
                    type: "admin"
                })
        }}>
        Create
       </button>
    </div>
  )
}

export default Admin
