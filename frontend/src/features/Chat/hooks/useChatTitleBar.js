import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SelectedChatContext } from "@/context";

export function useChatTitleBar() {
  const currentUser = useSelector((state) => state.session.user);
  const [receiver, setReceiver] = useState(null);

  const { selectedChat, pendingReceiver } = useContext(SelectedChatContext);

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
