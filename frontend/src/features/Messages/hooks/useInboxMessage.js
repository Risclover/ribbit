import { readMessage, useAppDispatch } from "@/store";
import React, { useState } from "react";

export default function useInboxMessage({ message }) {
  const dispatch = useAppDispatch();
  const [markedUnread, setMarkedUnread] = useState(() => !message.read);

  /* ---------- Handlers ------------- */
  const handleRead = async () => {
    if (!markedUnread) return;
    setMarkedUnread(false);
    await dispatch(readMessage(message.id));
  };

  return { markedUnread, setMarkedUnread, handleRead };
}
