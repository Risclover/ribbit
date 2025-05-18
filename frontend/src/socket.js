// src/socket.js
import { io } from "socket.io-client";
import { receiveNewMessage } from "@/store";
import { addNotification } from "@/store/notifications"; // if you want live notifs

let socket = null; // shared instance

export const initiateSocket = (userId) => {
  if (socket) return socket; // already connected

  socket = io(
    process.env.REACT_APP_BACKEND_URL || "/", // CRA env var or same-origin
    { withCredentials: true } // keep session cookies
  );

  socket.on("connect", () => {
    console.log("Socket connected, id:", socket.id);
    // No need to join a room — the server’s `on_connect` already did that.
  });

  // Chat messages pushed by the server
  socket.on("new_chat_message", (msg) => {
    store.dispatch(receiveNewMessage(msg));
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.off("new_chat_message");
    socket.off("new_notification");
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket; // handy accessor
