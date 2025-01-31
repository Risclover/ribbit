// import { SelectedChatContext } from "@/context";
// import React, { useContext, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchReactionsForMessage } from "@/store";

// export function useChatMessage({ socket, message }) {
//   const dispatch = useDispatch();

//   const [openReactions, setOpenReactions] = useState(false);
//   const [msgContent, setMsgContent] = useState("");

//   const currentUser = useSelector((state) => state.session.user);
//   const msgReactions = useSelector((state) => state.reactions);

//   const { selectedChat } = useContext(SelectedChatContext);

//   // Ensure message and message.id are defined
//   if (!message || !message.id) {
//     return null;
//   }

//   useEffect(() => {
//     dispatch(fetchReactionsForMessage(message.id));
//   }, [dispatch, message.id]);

//   const messageReactions = msgReactions[message.id] || [];

//   useEffect(() => {
//     if (
//       typeof message.content === "string" &&
//       message.content.slice(-4) === ".png"
//     ) {
//       setMsgContent(
//         `<div className="emoji-container">
//           <img src=${message.content} className="emoji" />
//         </div>`
//       );
//     } else if (
//       typeof message.content === "string" &&
//       message.content.includes("giphy")
//     ) {
//       setMsgContent(
//         `<div className="msg-gif">
//           <img src=${message.content} />
//         </div>`
//       );
//     } else {
//       setMsgContent(message.content);
//     }
//   }, [message.content]);

//   const extractImgUrl = (url) => {
//     const parts = url.split("/");
//     const filenameWithHash = parts[parts.length - 1];

//     const firstChar = filenameWithHash.charAt(0);

//     const newFilename = firstChar + ".gif";

//     console.log("newFilename:", newFilename);

//     return newFilename;
//   };

//   const handleReactionClick = (reactionData) => {
//     const hasReacted = reactionData.users.includes(currentUser?.id);
//     const payload = {
//       messageId: message.id,
//       reactionType: reactionData.reactionType,
//       room: selectedChat.id,
//     };

//     if (hasReacted) {
//       socket.emit("remove_reaction", payload);
//     } else {
//       socket.emit("add_reaction", payload);
//     }
//   };

//   return {
//     openReactions,
//     setOpenReactions,
//     msgContent,
//     messageReactions,
//     extractImgUrl,
//     handleReactionClick,
//   };
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReactionsForMessage } from "@/store";

export function useChatMessage({ socket, messageId, content }) {
  const dispatch = useDispatch();
  const [openReactions, setOpenReactions] = useState(false);
  const [msgContent, setMsgContent] = useState(content);

  const currentUser = useSelector((state) => state.session.user);
  const msgReactions = useSelector((state) => state.reactions);

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

  const extractImgUrl = (url) => {
    const parts = url.split("/");
    const filenameWithHash = parts[parts.length - 1];
    const firstChar = filenameWithHash.charAt(0);
    return firstChar + ".gif";
  };

  const handleReactionClick = (reactionData) => {
    const hasReacted = reactionData.users.includes(currentUser?.id);
    const payload = {
      messageId,
      reactionType: reactionData.reactionType,
      room: reactionData.roomId, // or pass the actual thread ID if needed
    };

    if (hasReacted) {
      socket.emit("remove_reaction", payload);
    } else {
      socket.emit("add_reaction", payload);
    }
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
