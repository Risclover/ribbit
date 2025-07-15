import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "@/store";
import { useSelectedChat } from "@/context";

export function useChatTitleBar() {
  const currentUser = useAppSelector((state) => state.session.user);
  const [receiver, setReceiver] = useState(null);

  const { selectedChat, pendingReceiver } = useSelectedChat();

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
