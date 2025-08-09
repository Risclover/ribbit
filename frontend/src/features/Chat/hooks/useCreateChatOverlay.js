import { useContext, useState } from "react";
import { useAppSelector } from "@/store";
import { useChat } from "@/context";

export function useCreateChatOverlay({
  username,
  userFound,
  setActiveOverlay,
  OVERLAYS,
}) {
  const { setSelectedChat, setPendingReceiver, setOverlay } = useChat();

  const [isChosen, setIsChosen] = useState(false);
  const [error, setError] = useState(false);

  const userChats = useAppSelector((state) =>
    Object.values(state.chatThreads.chatThreads)
  );
  const currentUser = useAppSelector((state) => state.session.user);

  const handleStartChat = (e) => {
    e.preventDefault();

    if (!userFound) return;

    // If user is "you", error out (can't start chat with self)
    if (userFound.id === currentUser.id) {
      setError(true);
      return;
    }

    // Check if chat with that user already exists
    const existingThread = userChats.find(
      (thread) =>
        thread.users?.some((u) => u.id === currentUser.id) &&
        thread.users?.some((u) => u.id === userFound.id)
    );

    if (existingThread) {
      setSelectedChat(existingThread);
      setOverlay(null);
    } else {
      // No existing thread => show the "invite" overlay
      setPendingReceiver(username);
      setOverlay("INVITE");
    }
  };

  return {
    isChosen,
    setIsChosen,
    error,
    setError,
    handleStartChat,
  };
}
