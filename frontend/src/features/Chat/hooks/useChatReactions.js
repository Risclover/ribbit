import { useContext } from "react";
import { useChat } from "@/context";
import {
  useAppDispatch,
  createReaction,
  fetchReactionsForMessage,
} from "@/store";

export function useChatReactions({ setOpenReactions, message, socket }) {
  const { selectedChat } = useChat();
  const dispatch = useAppDispatch();

  const handleClickReaction = async (reaction) => {
    const payload = {
      messageId: message?.id,
      reactionType: reaction,
      room: selectedChat.id,
    };

    const data = await dispatch(createReaction(payload));
    dispatch(fetchReactionsForMessage(message?.id));

    socket.emit("add_reaction", payload);

    setOpenReactions(false);
  };

  return { handleClickReaction };
}
