import React, { useState, useRef } from "react";
import { useOutsideClick } from "@/hooks";
import { reactions } from "@/assets";
import { useChatReactions } from "../../hooks/useChatReactions";

export function ChatReactions({
  setOpenReactions,
  message,
  socket,
  compact = false,
}) {
  const [openFull, setOpenFull] = useState(false);
  const wrapperRef = useRef();

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
        <svg
          rpl=""
          fill="currentColor"
          height="16"
          icon-name="add-outline"
          viewBox="0 0 20 20"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path>
        </svg>
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
