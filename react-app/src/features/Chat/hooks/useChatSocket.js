import { useEffect } from "react";
import { io } from "socket.io-client";

export function useChatSocket({
  socketRef,
  user,
  chatThreads,
  selectedChat,
  dispatch,
  onDelete,
  onReactionAdd,
  onReactionRemove,
  onNewMessage,
}) {
  useEffect(() => {
    if (!socketRef.current) {
      // Initialize socket only once
      socketRef.current = io();

      socketRef.current.on("connect", () => {
        // Join all existing chat rooms (threads) after connecting
        if (user && chatThreads) {
          Object.values(chatThreads).forEach((thread) => {
            socketRef.current.emit("join", {
              user: user.id,
              room: thread.id,
            });
          });
        }
      });

      socketRef.current.on("chat", () => {
        // When a new message arrives, re-fetch user chat threads
        onNewMessage?.();
      });

      socketRef.current.on("reaction_added", (data) => {
        onReactionAdd?.(data);
      });

      socketRef.current.on("reaction_removed", (data) => {
        onReactionRemove?.(data);
      });

      socketRef.current.on("deleted", onDelete);
    }

    if (socketRef.current && user && chatThreads) {
      Object.values(chatThreads).forEach((thread) => {
        socketRef.current.emit("join", {
          user: user.id,
          room: thread.id,
        });
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
    onNewMessage,
    socketRef,
    selectedChat?.id,
  ]);
}
