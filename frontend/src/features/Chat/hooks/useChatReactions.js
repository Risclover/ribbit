import { useContext } from "react";
import { useSelectedChat } from "@/context";
import { useAppDispatch } from "@/store";
import { createReaction } from "@/store";
import { fetchReactionsForMessage } from "@/store";

export function useChatReactions({ setOpenReactions, message, socket }) {
  const { selectedChat } = useSelectedChat();

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
