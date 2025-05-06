import { useContext } from "react";
import { useDispatch } from "react-redux";
import { SelectedChatContext } from "@/context";
import { createChatMessage, getChatThread } from "@/store";

export function useChatEmojis({ receiver, socket, setEmojisOverlay }) {
  const dispatch = useDispatch();

  const { selectedChat } = useContext(SelectedChatContext);

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
    await socket.emit("chat", data);
    dispatch(getChatThread(chatThreadId));
    setEmojisOverlay(false);
  };

  return { handleAddEmoji };
}
