import { useMemo } from "react";
import { formatDate } from "../utils/formatDate";

export function useChatMessages({ messages }) {
  return useMemo(() => {
    return messages.map((message, idx) => {
      const previousMessage = messages[idx - 1];
      const currentDate = new Date(message.createdAt).setHours(0, 0, 0, 0);
      const previousDate =
        previousMessage &&
        new Date(previousMessage.createdAt).setHours(0, 0, 0, 0);
      const showDateBar = !previousMessage || currentDate !== previousDate;
      const formattedDate = formatDate(message.createdAt);

      return {
        ...message,
        showDateBar,
        formattedDate,
        previousMessage,
      };
    });
  }, [messages]);
}
