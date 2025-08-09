import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { useChat } from "@/context";

export function useChatNavBtn({ chatThread }) {
  const { selectedChat } = useChat();

  const currentUser = useAppSelector((state) => state.session.user);

  const [time, setTime] = useState("");

  const isActive = selectedChat?.id === chatThread.id;
  const recipient = chatThread?.users?.find(
    (user) => user.id !== currentUser?.id
  );

  useEffect(() => {
    const lastMessage = chatThread.messages?.[chatThread.messages.length - 1];

    if (lastMessage) {
      const formattedTime = new Date(lastMessage.createdAt).toLocaleString(
        "en-US",
        {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }
      );
      setTime(formattedTime);
    }
  }, [chatThread.messages]);

  return { isActive, recipient, time };
}
