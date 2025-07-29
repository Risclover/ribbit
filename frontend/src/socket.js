import { io } from "socket.io-client";
import { receiveNewMessage, useAppDispatch } from "@/store";
import { addNotification } from "@/store/notifications"; // if you want live notifs
import { useDispatch } from "react-redux";

let socket;

/**
 * Create (or reuse) the single Socket.IO connection for the whole app.
 * You are running Flask‑SocketIO with **async_mode="threading"**,
 * therefore the server only supports HTTP long‑polling; we explicitly
 * disable WebSocket upgrades to prevent “Invalid frame header”.
 */
export function initiateSocket(userId, { forceNew = false } = {}) {
  if (socket && !forceNew) return socket;

  if (socket && forceNew) {
    socket.disconnect();
    socket = undefined;
  }

  socket = io(
    process.env.REACT_APP_BACKEND_URL || "/", //       dev proxy or prod same‑origin
    {
      withCredentials: true,
      transports: ["polling"], // <‑‑ important: only long‑polling
      upgrade: false, //        …and never try websocket
    }
  );

  socket.on("connect", () =>
    console.log("Socket connected:", socket.id, "(uid:", userId, ")")
  );

  return socket;
}

export const getSocket = () => socket;
