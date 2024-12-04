import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { createChatMessage, getChatThread } from "@/store";
import { v4 as uuidv4 } from "uuid";
import { ChatWindowEmojis } from "./emojis";
import "./ChatWindowInput.css";
import { SelectedChatContext } from "@/context/SelectedChat";

export function Emojis({ receiver, setEmojisOverlay, socket }) {
  const dispatch = useDispatch();

  const { selectedChat } = useContext(SelectedChatContext);

  const handleAddEmoji = async (e, image) => {
    e.preventDefault();
    const chatThreadId = selectedChat?.id;
    const payload = {
      content: image,
      receiverId: receiver.id,
      chatThreadId: chatThreadId,
    };

    const data = await dispatch(createChatMessage(payload));
    data.room = chatThreadId;
    await socket.emit("chat", data);
    dispatch(getChatThread(chatThreadId));
    setEmojisOverlay(false);
  };

  return (
    <div className="emojis-container">
      <div className="images-list">
        {ChatWindowEmojis.map((emoji) => (
          <button
            aria-label={emoji.name}
            key={uuidv4()}
            onClick={(e) => handleAddEmoji(e, emoji.image)}
          >
            <img src={emoji.image} alt={emoji.name} />
          </button>
        ))}
      </div>
      <div className="images-list-dropdown-tail"></div>
    </div>
  );
}
