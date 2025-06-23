import React, { createContext, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  const connectSocket = useCallback(() => {
    if (socketRef.current) {
      if (!socketRef.current.connected) {
        socketRef.current.connect();
      }
      return;
    }

    const newSocket = io(import.meta.env.VITE_BASE_URL, {
      withCredentials: true,
      autoConnect: false,
    });

    newSocket.removeAllListeners();

    newSocket.on('connect', () => {
      console.log('✅ Connected to socket server');
      setConnected(true);
      setSocket(newSocket);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from socket server');
      setConnected(false);
      setSocket(null);
    });

    newSocket.connect();
    socketRef.current = newSocket;
  }, []);

  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocket(null);
      setConnected(false);
    }
  }, []);

  const joinSocket = useCallback((userId, type) => {
    if (!userId || !type) {
      console.error('⚠️ joinSocket: Missing userId or type');
      return;
    }

    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('join', { userId, type });
      console.log('📡 join event emitted:', { userId, type });
    } else {
      console.warn('⏳ joinSocket skipped — socket not connected');
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connectSocket,
        disconnectSocket,
        joinSocket,
        connected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
