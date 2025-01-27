import React, { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { SlClose } from "react-icons/sl";
import { v4 as uuidv4 } from "uuid";
import { useChatGifs } from "../../hooks/useChatGifs";
import { useOutsideClick } from "@/hooks";

export function ChatGifs({
  receiver,
  setOpenGiphy,
  setGifIcon,
  GifIcon,
  socket,
}) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useOutsideClick(wrapperRef, () => setEmojisOverlay(false));

  const { handleClear, sendGif, handleEntry, results, closeBtn, text } =
    useChatGifs({
      receiver,
      setOpenGiphy,
      setGifIcon,
      GifIcon,
      socket,
    });
  return (
    <div className="giphy-box" ref={containerRef}>
      <div className="giphy-search">
        <CiSearch />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleEntry}
          ref={inputRef}
          placeholder="Search GIPHY"
        />
        {closeBtn && (
          <button
            aria-label="Close"
            className="giphy-input-close"
            onClick={(e) => handleClear(e)}
          >
            <SlClose />
          </button>
        )}
      </div>
      <div className="giphy-results">
        {results.map((gif) => (
          <img
            key={uuidv4()}
            src={gif.images?.original.url}
            className="giphy-gif"
            onClick={sendGif}
          />
        ))}
      </div>
    </div>
  );
}
