// import React, { useRef } from "react";
// import { CiSearch } from "react-icons/ci";
// import { SlClose } from "react-icons/sl";
// import { v4 as uuidv4 } from "uuid";
// import { useChatGifs } from "../../hooks/useChatGifs";
// import { useOutsideClick } from "@/hooks";

// export function ChatGifs({
//   receiver,
//   setOpenGiphy,
//   setGifIcon,
//   GifIcon,
//   socket,
// }) {
//   const wrapperRef = useRef(null);
//   const containerRef = useRef(null);
//   const inputRef = useRef(null);

//   useOutsideClick(wrapperRef, () => setEmojisOverlay(false));

//   const { handleClear, sendGif, handleEntry, results, closeBtn, text } =
//     useChatGifs({
//       receiver,
//       setOpenGiphy,
//       setGifIcon,
//       GifIcon,
//       socket,
//     });
//   return (
//     <div className="giphy-box" ref={containerRef}>
//       <div className="giphy-search">
//         <CiSearch />
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={handleEntry}
//           ref={inputRef}
//           placeholder="Search GIPHY"
//         />
//         {closeBtn && (
//           <button
//             aria-label="Close"
//             className="giphy-input-close"
//             onClick={(e) => handleClear(e)}
//           >
//             <SlClose />
//           </button>
//         )}
//       </div>
//       <div className="giphy-results">
//         {results.map((gif) => (
//           <img
//             key={uuidv4()}
//             src={gif.images?.original.url}
//             className="giphy-gif"
//             onClick={sendGif}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useRef, useState, useEffect } from "react";
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
  GifIconDark,
  socket,
}) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  // We manage search text locally here
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [closeBtn, setCloseBtn] = useState(false);
  const [offset, setOffset] = useState(0);

  const {
    handleClear,
    sendGif,
    handleEntry,
    handleScroll,
    loadTrending,
    loadSearch,
  } = useChatGifs({
    receiver,
    setOpenGiphy,
    setGifIcon,
    GifIcon,
    socket,
    containerRef,
    searchText,
    setSearchText,
    offset,
    setOffset,
    setResults,
  });

  // Clicking outside closes this
  useOutsideClick(wrapperRef, () => setOpenGiphy(false));

  // Load initial
  useEffect(() => {
    if (!searchText) {
      loadTrending();
    } else {
      loadSearch();
    }
  }, [searchText]);

  // Listen for scrolling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scrollHandler = () => handleScroll();
    el.addEventListener("scroll", scrollHandler);
    return () => el.removeEventListener("scroll", scrollHandler);
  }, [handleScroll]);

  // watch text to show/hide close button
  useEffect(() => {
    setCloseBtn(!!searchText);
  }, [searchText]);

  return (
    <div className="giphy-box" ref={wrapperRef}>
      <div className="giphy-search">
        <CiSearch />
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleEntry}
          placeholder="Search GIPHY"
        />
        {closeBtn && (
          <button
            aria-label="Close"
            className="giphy-input-close"
            onClick={handleClear}
          >
            <SlClose />
          </button>
        )}
      </div>
      <div className="giphy-results" ref={containerRef}>
        {results.map((gif) => (
          <img
            key={uuidv4()}
            src={gif.images?.original.url}
            className="giphy-gif"
            onClick={() => sendGif(gif.images?.original.url)}
            alt="gif"
          />
        ))}
      </div>
    </div>
  );
}
