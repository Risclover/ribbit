import { useMemo } from "react";
import { useAppSelector } from "@/store";

export const useSortedChatThreads = () => {
  const chatThreads = useAppSelector((state) => state.chatThreads.chatThreads);

  const sortedChatThreads = useMemo(() => {
    return Object.values(chatThreads).sort((a, b) => {
      const aMessages = a.messages || [];
      const bMessages = b.messages || [];

      const aLastMessage = aMessages[aMessages.length - 1];
      const bLastMessage = bMessages[bMessages.length - 1];

      if (aMessages.length === 0 && bMessages.length === 0) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (aMessages.length === 0) {
        return 1;
      }

      if (bMessages.length === 0) {
        return -1;
      }

      return (
        new Date(bLastMessage.createdAt) - new Date(aLastMessage.createdAt)
      );
    });
  }, [chatThreads]);

  return sortedChatThreads;
};
