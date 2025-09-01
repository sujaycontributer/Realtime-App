
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { BACKEND_URL } from '@/lib/utils';

interface SocketContextInterface {
    socket: Socket | null;
    isConnected: boolean,
    connectSocket: () => void,
    disconnectSocket: () => void,
}

export const SocketContext = createContext<SocketContextInterface>({
  socket: null,
  isConnected: false,
  connectSocket: () => {},
  disconnectSocket: () => {},
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export default function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // This creates the socket instance only once when the component mounts
    const newSocket = io(`${BACKEND_URL}`, {
      autoConnect: false, 
    });

    // Set up event listeners
    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    setSocket(newSocket);

    // Clean up on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []); // Empty dependency array ensures this runs only once

  // Functions to manually control the connection
  const connectSocket = () => {
    console.log("Connection request");
    if (socket && !socket.connected) {
      socket.connect();
    }
  };

  const disconnectSocket = () => {
    if (socket && socket.connected) {
      socket.disconnect();
    }
  };

  const socketValue = {
    socket,
    isConnected,
    connectSocket,
    disconnectSocket,
  };

  return (
    <SocketContext.Provider value={socketValue}>
      {children}
    </SocketContext.Provider>
  );
}
