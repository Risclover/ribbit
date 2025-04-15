import { useContext } from "react";
import { SelectedChatContext } from "@/context";
import { useDispatch } from "react-redux";
import { createReaction } from "@/store";
import { fetchReactionsForMessage } from "@/store";

export function useChatReactions({ setOpenReactions, message, socket }) {
  const { selectedChat } = useContext(SelectedChatContext);
  const dispatch = useDispatch();

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
