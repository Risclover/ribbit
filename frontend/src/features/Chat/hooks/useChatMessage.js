import { useContext, useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  fetchReactionsForMessage,
  deleteReaction,
  createReaction,
} from "@/store";
import { useSelectedChat } from "@/context";

export function useChatMessage({ socket, messageId, content }) {
  const dispatch = useAppDispatch();

  const [openReactions, setOpenReactions] = useState(false);
  const [msgContent, setMsgContent] = useState(content);

  const { selectedChat } = useSelectedChat();

  const currentUser = useAppSelector((state) => state.session.user);
  const msgReactions = useAppSelector((state) => state.reactions);

  useEffect(() => {
    if (typeof content === "string" && content.endsWith(".png")) {
      setMsgContent(
        `<div className="emoji-container"><img src=${content} className="emoji" /></div>`
      );
    } else if (typeof content === "string" && content.includes("giphy")) {
      setMsgContent(
        `<div className="msg-gif"><img src=${content} alt="gif" /></div>`
      );
    } else {
      setMsgContent(content);
    }
  }, [content]);

  const messageReactions = msgReactions[messageId] || [];

  const extractImgUrl = (url) => {
    const parts = url.split("/");
    const filenameWithHash = parts[parts.length - 1];
    const firstChar = filenameWithHash.charAt(0);
    return firstChar + ".gif";
  };

  // On clicking a reaction: If the user has already reacted, delete; otherwise, create the reaction.
  const handleReactionClick = async (reactionData) => {
    const hasReacted = reactionData.users.includes(currentUser?.id);

    const payload = {
      messageId: messageId,
      reactionType: reactionData.reactionType,
      room: selectedChat.id,
    };

    if (hasReacted) {
      dispatch(deleteReaction(payload));
      socket.emit("remove_reaction", payload);
    } else {
      dispatch(createReaction(payload));
      socket.emit("add_reaction", payload);
    }

    dispatch(fetchReactionsForMessage(messageId));
  };

  return {
    openReactions,
    setOpenReactions,
    msgContent,
    messageReactions,
    extractImgUrl,
    handleReactionClick,
  };
}
