// src/features/Chat/hooks/useChatSocket.js
import { useEffect } from "react";
import { initiateSocket } from "@/socket";
import { receiveNewMessage } from "@/store";

/**
 * Hook that wires the single Socket.IO connection to the Redux store
 * and keeps the user joined to all their chat‑thread rooms.
 */
export function useChatSocket({
  user, // current logged‑in user
  chatThreads, // map of threadId → thread data
  dispatch, // Redux dispatch
  onDelete, // callback for “deleted” events
  onReactionAdd, // callback for “reaction_added” events
  onReactionRemove, // callback for “reaction_removed” events
}) {
  /* ------------------------------------------------------------------
     1. Get (or create) the singleton socket.
     ------------------------------------------------------------------ */
  const socket = initiateSocket(user?.id);

  /* ------------------------------------------------------------------
     2. Attach one‑time event listeners.
     ------------------------------------------------------------------ */
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => dispatch(receiveNewMessage(message));

    socket.on("chat", handleNewMessage);
    socket.on("reaction_added", onReactionAdd);
    socket.on("reaction_removed", onReactionRemove);
    socket.on("deleted", onDelete);

    // Clean‑up when the component unmounts
    return () => {
      socket.off("chat", handleNewMessage);
      socket.off("reaction_added", onReactionAdd);
      socket.off("reaction_removed", onReactionRemove);
      socket.off("deleted", onDelete);
    };
  }, [socket, dispatch, onDelete, onReactionAdd, onReactionRemove]);

  /* ------------------------------------------------------------------
     3. Join every thread room whenever the list changes.
     ------------------------------------------------------------------ */
  useEffect(() => {
    if (!socket || !user) return;

    Object.values(chatThreads || {}).forEach((thread) => {
      socket.emit("join", { user: user.id, room: thread.id });
    });
  }, [socket, user, chatThreads]);
}
