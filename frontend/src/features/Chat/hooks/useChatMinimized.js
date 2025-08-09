import { useOpenChat } from "context/OpenChatContext";
import { useContext } from "react";
import { useAppSelector } from "@/store";
import { useChat } from "@/context";

export function useChatMinimized({ setMinimizeChat }) {
  const chatThreads = useAppSelector((state) => state.chatThreads.chatThreads);
  const { setOpenChat } = useChat();

  const sortedThreads = Object.values(chatThreads).sort((a, b) => {
    const aMessages = a.messages;
    const bMessages = b.messages;

    if (aMessages && bMessages) {
      const aLastMessage = aMessages[aMessages?.length - 1];
      const bLastMessage = bMessages[bMessages?.length - 1];

      if (aMessages?.length === 0 && bMessages?.length === 0) {
        return a.createdAt.localeCompare(b.createdAt);
      }

      if (aMessages?.length === 0) {
        return 1;
      }

      if (bMessages?.length === 0) {
        return -1;
      }

      return (
        new Date(bLastMessage.createdAt) - new Date(aLastMessage.createdAt)
      );
    }
  });

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenChat(false);
    setMinimizeChat(false);
  };

  return { sortedThreads, handleClose };
}
