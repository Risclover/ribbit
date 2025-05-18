import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { addNotification } from "@/store";

const socket = io(import.meta.env.VITE_API_URL); // or whatever you use

export default function useMsgNotificationSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("new_notification", (notif) => {
      dispatch(addNotification(notif)); // real-time Redux update
    });

    return () => socket.off("new_notification");
  }, [dispatch]);
}
