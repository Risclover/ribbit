// useChatSocket.js
import { io } from "socket.io-client";
import { receiveNewMessage } from "@/store"; // <-- import your action
import { useEffect } from "react";

export function useChatSocket({
  socketRef,
  user,
  chatThreads,
  selectedChat,
  dispatch,
  onDelete,
  onReactionAdd,
  onReactionRemove,
  // onNewMessage, // We will no longer rely on an external callback
}) {
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io();

      socketRef.current.on("connect", () => {
        if (user && chatThreads) {
          Object.values(chatThreads).forEach((thread) => {
            socketRef.current.emit("join", { user: user.id, room: thread.id });
          });
        }
      });

      // IMMEDIATELY dispatch receiveNewMessage when "chat" event arrives
      socketRef.current.on("chat", (messageData) => {
        dispatch(receiveNewMessage(messageData));
      });

      socketRef.current.on("reaction_added", onReactionAdd);
      socketRef.current.on("reaction_removed", onReactionRemove);
      socketRef.current.on("deleted", onDelete);
    }

    // Re-join rooms if chatThreads changes
    if (socketRef.current && user && chatThreads) {
      Object.values(chatThreads).forEach((thread) => {
        socketRef.current.emit("join", { user: user.id, room: thread.id });
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [
    chatThreads,
    user,
    dispatch,
    onDelete,
    onReactionAdd,
    onReactionRemove,
    socketRef,
    selectedChat?.id,
  ]);
}
