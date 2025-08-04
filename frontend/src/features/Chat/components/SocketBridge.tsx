import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useChatSocket } from "@/features/Chat/hooks/useChatSocket";
import { getUserChatThreads } from "@/store/chats";
import { useAppSelector } from "@/store";

export function SocketBridge() {
  const dispatch = useDispatch();
  const user = useAppSelector((s) => s.session.user);
  const chatThreads = useAppSelector((s) => s.chatThreads.chatThreads);

  /* (a) fetch all threads once we have a user -------------- */
  useEffect(() => {
    if (user) dispatch(getUserChatThreads());
  }, [user, dispatch]);

  /* (b) create the socket + listeners ---------------------- */
  useChatSocket({
    user,
    chatThreads,
    onDelete: () => {
      return;
    }, // you can wire these if you need them
    onReactionAdd: () => {
      return;
    },
    onReactionRemove: () => {
      return;
    },
  });

  return null; // this component renders nothing
}
