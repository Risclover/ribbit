// src/socket.js
import { io } from "socket.io-client";
import { receiveNewMessage } from "./store/chatThreads";

let socket;

export const initiateSocket = (userId) => {
  if (!socket) {
    // If your Flask server is on the same domain & port, you can do simply:
    socket = io();
    // If different domain, pass it in: io("http://localhost:5000");

    // On connect, have the client join its user-specific room
    socket.on("connect", () => {
      console.log("Socket connected, id:", socket.id);

      // Join "user_XXX" so that the server can emit to only your user
      socket.emit("join_room", { room: `user_${userId}` });
    });

    // Listen for new chat messages from the server
    socket.on("new_chat_message", (message) => {
      // Dispatch to the Redux store so it updates the correct chat thread
      store.dispatch(receiveNewMessage(message));
    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
