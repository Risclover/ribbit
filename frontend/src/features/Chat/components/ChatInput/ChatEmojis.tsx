import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useChatEmojis } from "../../hooks/useChatEmojis";
import { useFocusTrap, useOutsideClick } from "@/hooks";
import { ChatWindowEmojis } from "@/assets";
import { getSocket } from "@/socket";

export function ChatEmojis({ receiver, setOpenEmojis, openEmojis }) {
  const wrapperRef = useRef();
  useOutsideClick(wrapperRef, () => setOpenEmojis(false));
  useFocusTrap(openEmojis, wrapperRef);

  const { handleAddEmoji } = useChatEmojis({
    receiver,
    setOpenEmojis,
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
