import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { addNotification } from "store";

export function useNotificationsSocket(user) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    // open the socket
    const socket = io();

    // Listen for new_notification
    socket.on("new_notification", (notifData) => {
      // dispatch an action to add to Redux or handle however you want
      dispatch(addNotification(notifData));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, user]);
}
