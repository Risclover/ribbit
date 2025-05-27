// hooks/useNotificationsSocket.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "@/store";
import { initiateSocket } from "socket"; // <- only this

export function useNotificationsSocket(user) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    const socket = initiateSocket(user.id); // creates (or re-uses) the conn.

    const handler = (notif) => dispatch(addNotification(notif));
    socket.on("new_notification", handler);

    return () => socket.off("new_notification", handler);
  }, [dispatch, user]);
}
