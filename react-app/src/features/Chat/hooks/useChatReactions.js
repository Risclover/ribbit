import { useContext } from "react";
import { SelectedChatContext } from "@/context";

export function useChatReactions({ setOpenReactions, message, socket }) {
  const { selectedChat } = useContext(SelectedChatContext);

  const handleClickReaction = async (reaction) => {
    const payload = {
      messageId: message?.id,
      reactionType: reaction,
      room: selectedChat.id,
    };
    // const data = await dispatch(createReaction(payload));
    // console.log("data:", data);
    // dispatch(fetchReactionsForMessage(message.id));
    socket.emit("add_reaction", payload);
    setOpenReactions(false);
  };

  return { handleClickReaction };
}
