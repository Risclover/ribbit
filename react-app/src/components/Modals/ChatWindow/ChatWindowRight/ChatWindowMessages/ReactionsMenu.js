import React, { useState } from "react";
import { TfiPlus } from "react-icons/tfi";

import One from "./frog-reactions-cropped/1.gif";
import Two from "./frog-reactions-cropped/2.gif";
import Three from "./frog-reactions-cropped/3.gif";
import Four from "./frog-reactions-cropped/4.gif";
import Five from "./frog-reactions-cropped/5.gif";
import { useDispatch } from "react-redux";
import { getChatThread, reactToMessage } from "../../../../../store/chats";

const reactions = [One, Two, Three, Four, Five];

export default function ReactionsMenu({ message, selectedChat }) {
  const dispatch = useDispatch();
  const [reactionType, setReactionType] = useState("");

  console.log("message:", message);

  const react = async (e, reaction) => {
    e.preventDefault();
    console.log("reaction:", reaction);
    const payload = {
      messageId: message,
      reactionType: reaction,
    };

    console.log("payload:", payload);

    const data = await dispatch(reactToMessage(payload));
    console.log(data);
    // dispatch(getChatThread(message?.threadId));
  };

  return (
    <div className="reactions-menu">
      {reactions.map((reaction) => (
        <div
          className="reactions-menu-square"
          onClick={(e) => react(e, reaction)}
        >
          <img src={reaction} />
        </div>
      ))}
      <div className="reactions-menu-square">
        <div className="reactions-menu-plus">
          <TfiPlus />
        </div>
      </div>
    </div>
  );
}
