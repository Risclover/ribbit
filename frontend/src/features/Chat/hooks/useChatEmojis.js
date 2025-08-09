import { useContext } from "react";
import { useChat } from "@/context";
import { createChatMessage, getChatThread, useAppDispatch } from "@/store";
import { getSocket } from "@/socket";

export function useChatEmojis({ receiver, setOpenEmojis }) {
  const dispatch = useAppDispatch();
  const socket = getSocket();
  const { selectedChat } = useChat();

  const handleAddEmoji = async (e, image) => {
    e.preventDefault();
    const chatThreadId = selectedChat?.id;
    const payload = {
      content: image,
      receiverId: receiver.id,
      chatThreadId: chatThreadId,
    };

    const data = await dispatch(createChatMessage(payload));
    data.room = chatThreadId;
    socket.emit("chat", data);
    setOpenEmojis(false);
  };

  return { handleAddEmoji };
}
