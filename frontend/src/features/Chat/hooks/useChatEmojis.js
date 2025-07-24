import { useContext } from "react";
import { useAppDispatch } from "@/store";
import { useSelectedChat } from "@/context";
import { createChatMessage, getChatThread } from "@/store";

export function useChatEmojis({ receiver, socket, setEmojisOverlay }) {
  const dispatch = useAppDispatch();

  const { selectedChat } = useSelectedChat();

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
    dispatch(getChatThread(chatThreadId));
    setEmojisOverlay(false);
  };

  return { handleAddEmoji };
}
