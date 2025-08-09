import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { useChat } from "@/context";

export function useChatTitleBar() {
  const currentUser = useAppSelector((state) => state.session.user);
  const [receiver, setReceiver] = useState(null);

  const { selectedChat, pendingReceiver } = useChat();

  // pendingReceiver: Flag that indicates whether the title bar should show the username or not
  // For the 'Create Chat' overlay
  useEffect(() => {
    if (pendingReceiver !== null) {
      setReceiver(pendingReceiver);
    } else if (selectedChat && selectedChat.users) {
      setReceiver(
        selectedChat.users.find((user) => user.id !== currentUser?.id).username
      );
    }
  }, [selectedChat?.users, currentUser?.id, pendingReceiver]);

  return { receiver };
}
