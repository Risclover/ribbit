import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChatWindowEmojis } from "@/assets";
import { useChatEmojis } from "../../hooks/useChatEmojis";

export function ChatEmojis({ receiver, setEmojisOverlay, socket }) {
  const wrapperRef = useRef();

  const { handleAddEmoji } = useChatEmojis({
    receiver,
    socket,
    setEmojisOverlay,
    wrapperRef,
  });

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
