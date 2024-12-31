import socket from "socket.io-client";

let socketInstance = null;

export const initializeSocket = () => {
  socketInstance = socket(import.meta.env.VITE_API_URL, {
    auth: {
      token: localStorage.getItem("token"),
    },
  });
  return socketInstance;
};

export const receiveMessagae = (eventName, cb) => {
  socketInstance.emit(eventName, cb);
};
export const sendMessage = (eventName, data) => {
  socketInstance.emit(eventName, data);
};
