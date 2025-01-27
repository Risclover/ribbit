import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectedChatContext } from "@/context";
import { getUserChatThreads } from "@/store";

export function useChatThread({
  containerRef,
  messages,
  setMessages,
  prevScrollHeightRef,
}) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);
  const reactions = useSelector((state) => state.reactions);
  const chatThreads = useSelector((state) => state.chatThreads);
  const user = useSelector((state) => state.session.user);

  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);

  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    setReceiver(() =>
      selectedChat?.users?.find((user) => user.id !== currentUser?.id)
    );
  }, [selectedChat?.users, currentUser?.id, chatThreads]);

  useEffect(() => {
    if (user) {
      dispatch(getUserChatThreads());
    }
  }, [user, dispatch]);

  useEffect(() => {
    const chat = Object.values(chatThreads).find(
      (chat) => chat?.id === selectedChat?.id
    );

    if (chat && chat.id !== selectedChat.id) {
      setSelectedChat(chat);
    }

    if (chat && JSON.stringify(chat.messages) !== JSON.stringify(messages)) {
      setMessages(chat.messages);
    }
  }, [selectedChat, chatThreads]);

  useEffect(() => {
    if (containerRef.current) {
      const containerElement = containerRef.current;

      const prevScrollHeight = prevScrollHeightRef.current || 0;
      const currentScrollHeight = containerElement.scrollHeight;

      // Determine if the user was at the bottom before the update
      const isScrolledToBottom =
        containerElement.scrollTop + containerElement.clientHeight >=
        prevScrollHeight - 1; // Small threshold

      if (isScrolledToBottom) {
        // Adjust scrollTop by the change in scrollHeight
        const scrollDifference = currentScrollHeight - prevScrollHeight;
        containerElement.scrollTop += scrollDifference;
      }

      // Update the previous scrollHeight
      prevScrollHeightRef.current = currentScrollHeight;
    }
  }, [messages, reactions]);

  return { receiver };
}
