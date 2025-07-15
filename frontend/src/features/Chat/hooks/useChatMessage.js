import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchReactionsForMessage } from "@/store";
import { useSelectedChat } from "@/context";
import { deleteReaction } from "@/store";
import { createReaction } from "@/store";

export function useChatMessage({ socket, messageId, content }) {
  const dispatch = useAppDispatch();
  const [openReactions, setOpenReactions] = useState(false);
  const [msgContent, setMsgContent] = useState(content);
  const { selectedChat } = useSelectedChat();

  const currentUser = useAppSelector((state) => state.session.user);
  const msgReactions = useAppSelector((state) => state.reactions);

  useEffect(() => {
    dispatch(fetchReactionsForMessage(messageId));
  }, [dispatch, messageId]);

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

  console.log("messageReactions:", messageReactions);

  const extractImgUrl = (url) => {
    const parts = url.split("/");
    const filenameWithHash = parts[parts.length - 1];
    const firstChar = filenameWithHash.charAt(0);
    return firstChar + ".gif";
  };

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
