import { useContext, useEffect, useState } from "react";
import { SelectedChatContext } from "@/context";
import { useSelector } from "react-redux";

export default function useChatNavBtn({ chatThread }) {
  const { selectedChat } = useContext(SelectedChatContext);
  const currentUser = useSelector((state) => state.session.user);
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
