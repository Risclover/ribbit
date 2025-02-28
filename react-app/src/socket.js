import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

let socket;

export const initSocket = () => {
  const dispatch = useDispatch();
  socket = io();

  socket.on("connect", () => {
    console.log("Connected to socket.io server, id:", socket.id);
  });

  socket.on("thread_unread", (data) => {
    dispatch(threadUnreadUpdate(data.threadId, data.hasUnread));
  });
};

export const getSocket = () => socket;
