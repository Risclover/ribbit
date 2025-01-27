import React, { useContext, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { SelectedChatContext } from "@/context";
import { useOutsideClick } from "@/hooks";
import { createChatMessage, getChatThread } from "@/store";
import { ChatWindowEmojis } from "@/assets";

export function ChatEmojis({ receiver, setEmojisOverlay, socket }) {
  const dispatch = useDispatch();

  const { selectedChat } = useContext(SelectedChatContext);

  const wrapperRef = useRef();

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

  useOutsideClick(wrapperRef, () => setEmojisOverlay(false));

  return (
    <div className="emojis-container" ref={wrapperRef}>
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
