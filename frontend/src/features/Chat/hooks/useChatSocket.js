// src/features/Chat/hooks/useChatSocket.js
import { useEffect, useMemo, useRef } from "react";
import { initiateSocket } from "@/socket";

/* ---- chat‑slice actions ---- */
import {
  receiveNewMessage,
  threadUnreadUpdate,
  setUnreadTotal,
} from "@/store/chats";
import { useAppDispatch } from "@/store";

/**
 * Hook that wires the single Socket.IO connection to the Redux store
 * and keeps the user joined to all their chat‑thread rooms.
 *
 * @param {object}   props
 * @param {object}   props.user              – current logged‑in user
 * @param {object}   props.chatThreads       – map: id → thread
 * @param {function} props.onDelete          – handler for `"deleted"`
 * @param {function} props.onReactionAdd     – handler for `"reaction_added"`
 * @param {function} props.onReactionRemove  – handler for `"reaction_removed"`
 */
export function useChatSocket({
  user,
  chatThreads,
  onDelete = () => {
    return;
  },
  onReactionAdd = () => {
    return;
  },
  onReactionRemove = () => {
    return;
  },
}) {
  const dispatch = useAppDispatch();
  const joinedRooms = useRef(new Set());
  /* ------------------------------------------------------------------
   * 1. (Re)create the singleton Socket.IO client when the user changes.
   * ------------------------------------------------------------------ */
  const socket = useMemo(() => initiateSocket(user?.id), [user?.id]);

  /* ------------------------------------------------------------------
   * 2. Attach the event listeners exactly once.
   * ------------------------------------------------------------------ */
  useEffect(() => {
    if (!socket || !user) return;

    /* ----- server pushed whole‑account unread total ----- */
    const handleUnread = ({ count }) => dispatch(setUnreadTotal(count));

    /* ----- new message in any room we are listening to ----- */
    const handleNewMessage = (msg) => {
      dispatch(receiveNewMessage(msg));

      /* if the message is **not** sent by the current user,
         mark that thread as unread locally                         */
      const senderId = msg.sender_id ?? msg.sender?.id;
      const threadId = msg.threadId ?? msg.thread_id;
      if (senderId !== user.id) dispatch(threadUnreadUpdate(threadId, true));
    };

    socket.on("unread_count", handleUnread);
    socket.on("chat", handleNewMessage);
    socket.on("reaction_added", onReactionAdd);
    socket.on("reaction_removed", onReactionRemove);
    socket.on("deleted", onDelete);

    /* Clean‑up when the component unmounts or deps change */
    return () => {
      socket.off("unread_count", handleUnread);
      socket.off("chat", handleNewMessage);
      socket.off("reaction_added", onReactionAdd);
      socket.off("reaction_removed", onReactionRemove);
      socket.off("deleted", onDelete);
    };
  }, [socket, user, dispatch, onDelete, onReactionAdd, onReactionRemove]);

  /* ------------------------------------------------------------------
   * 3. Join thread rooms efficiently - only join new rooms.
   * ------------------------------------------------------------------ */
  useEffect(() => {
    if (!socket || !user) return;

    Object.keys(chatThreads || {}).forEach((id) => {
      const roomId = Number(id);
      if (!joinedRooms.current.has(roomId)) {
        socket.emit("join", { user: user.id, room: roomId });
        joinedRooms.current.add(roomId);
      }
    });
  }, [socket, user, chatThreads]);

  /* ------------------------------------------------------------------
   * 4. Clear joined rooms when socket reconnects
   * ------------------------------------------------------------------ */
  useEffect(() => {
    if (!socket) return;

    const handleReconnect = () => {
      joinedRooms.current.clear();
    };

    socket.on("connect", handleReconnect);
    return () => socket.off("connect", handleReconnect);
  }, [socket]);
}
