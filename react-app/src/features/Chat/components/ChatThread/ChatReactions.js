import React, { useState, useRef } from "react";
import { useOutsideClick } from "@/hooks";
import { reactions } from "@/assets";
import { useChatReactions } from "../../hooks/useChatReactions";
import { PlusIcon } from "@/assets";

export function ChatReactions({
  setOpenReactions,
  message,
  socket,
  compact = false,
  wrapperRef,
}) {
  const [openFull, setOpenFull] = useState(false);

  useOutsideClick(wrapperRef, () => setOpenReactions(false));

  return (
    <div
      className={`${compact ? "reactions-menu-compact" : "reactions-menu"}`}
      ref={wrapperRef}
    >
      {!openFull && (
        <ChatReactionsSmall
          setOpenFull={setOpenFull}
          setOpenReactions={setOpenReactions}
          message={message}
          socket={socket}
        />
      )}
      {openFull && (
        <ChatReactionsFull setOpenFull={setOpenFull} socket={socket} />
      )}
    </div>
  );
}

export function ChatReactionsSmall({
  openReactions,
  setOpenFull,
  setOpenReactions,
  message,
  socket,
}) {
  const { handleClickReaction } = useChatReactions({
    setOpenReactions,
    message,
    socket,
  });

  return (
    <div className="reactions-menu-small">
      {Object.values(reactions).map((reaction, idx) =>
        idx <= 4 ? (
          <img
            onClick={() => handleClickReaction(reaction)}
            src={reaction}
            alt="Reaction"
            key={idx}
          />
        ) : null
      )}
      <button
        className="reactions-menu-btn"
        onClick={() => {
          setOpenFull(true);
        }}
      >
        <PlusIcon />
      </button>
    </div>
  );
}

export function ChatReactionsFull({ setOpenFull }) {
  return (
    <div className="reactions-menu-full">
      <div className="reactions-menu-full-grid">
        {Object.values(reactions).map((reaction, idx) => (
          <img src={reaction} alt="Reaction" key={idx} />
        ))}
      </div>
    </div>
  );
}
