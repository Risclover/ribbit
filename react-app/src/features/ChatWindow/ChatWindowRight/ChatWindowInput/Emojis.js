import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { createChatMessage, getChatThread } from "@/store";
import * as emojis from "./emojis";
import { ChatWindowEmojis } from "./emojis";
import "./ChatWindowInput.css";
import { SelectedChatContext } from "@/context/SelectedChat";

export function Emojis({ receiver, setEmojisOverlay, socket }) {
  const dispatch = useDispatch();

  const { selectedChat } = useContext(SelectedChatContext);

  const handleAddEmoji = async (e, image) => {
    e.preventDefault();
    const payload = {
      content: image,
      receiverId: receiver.id,
      chatThreadId: selectedChat.id,
    };

    const data = await dispatch(createChatMessage(payload));
    socket.emit("chat", data);
    socket.emit("last", data);
    await dispatch(getChatThread(selectedChat.id));
    setEmojisOverlay(false);
  };

  return (
    <div className="emojis-container">
      <div className="images-list">
        {ChatWindowEmojis.map((image, idx) => (
          <button key={idx} onClick={(e) => handleAddEmoji(e, image)}>
            <img key={idx} src={image} />
          </button>
        ))}
      </div>
      <div className="images-list-dropdown-tail"></div>
    </div>
  );
}
