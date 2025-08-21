import { io } from "socket.io-client";
import { receiveNewMessage, useAppDispatch } from "@/store";
import { addNotification } from "@/store/notifications"; // if you want live notifs
import { useDispatch } from "react-redux";

let socket;

/**
 * Create (or reuse) the single Socket.IO connection for the whole app.
 * The server now supports both WebSocket and HTTP long-polling transports
 * for optimal performance. WebSocket is tried first with fallback to polling.
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
      transports: ["websocket", "polling"], // Try websocket first, fallback to polling
      upgrade: true, // Allow upgrade from polling to websocket
      timeout: 20000,
      pingTimeout: 60000,
      pingInterval: 25000,
    }
  );

  socket.on("connect", () =>
    console.log("Socket connected:", socket.id, "(uid:", userId, ")")
  );

  return socket;
}

export const getSocket = () => socket;
