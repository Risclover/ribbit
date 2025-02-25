import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { SelectedChatContext } from "@/context";

export function useCreateChatOverlay({
  username,
  userFound,
  setActiveOverlay,
  OVERLAYS,
}) {
  const { setSelectedChat, setPendingReceiver } =
    useContext(SelectedChatContext);
  const [isChosen, setIsChosen] = useState(false);
  const [error, setError] = useState(false);

  const userChats = useSelector((state) => Object.values(state.chatThreads));
  const currentUser = useSelector((state) => state.session.user);

  const handleStartChat = (e) => {
    e.preventDefault();

    if (!userFound) return;

    // If user is “you”, error out
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
      setActiveOverlay(null);
    } else {
      // No existing thread => show the “invite” overlay
      setPendingReceiver(username);
      setActiveOverlay(OVERLAYS.INVITE);
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
