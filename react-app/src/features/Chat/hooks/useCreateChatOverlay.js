import { SelectedChatContext } from "context";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

export function useCreateChatOverlay({
  username,
  setShowChatWelcomeOverlay,
  setShowCreateChatOverlay,
  setShowMessageInviteOverlay,
  userFound,
}) {
  const { setSelectedChat, setPendingReceiver } =
    useContext(SelectedChatContext);

  const [isChosen, setIsChosen] = useState(false);
  const [error, setError] = useState(false);

  const userChats = useSelector((state) => Object.values(state.chatThreads));
  const currentUser = useSelector((state) => state.session.user);

  // Get to point between message invitation and actually creating the thread
  const handleStartChat = async (e) => {
    e.preventDefault();
    const existingThread = userChats.find(
      (thread) =>
        thread.users?.some((user) => user.id === currentUser?.id) &&
        thread.users?.some((user) => user.id === userFound.id)
    );
    // If the thread does not exist, close the overlays. If it does exist, set the selected chat to the existing thread and open it.
    if (existingThread === undefined) {
      setShowChatWelcomeOverlay(false);
      setShowMessageInviteOverlay(true);
      setPendingReceiver(username);
    } else {
      setSelectedChat(existingThread);
    }
    setShowCreateChatOverlay(false);
  };

  return { isChosen, setIsChosen, error, setError, handleStartChat };
}
