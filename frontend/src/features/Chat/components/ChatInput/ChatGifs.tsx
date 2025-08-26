import { v4 as uuidv4 } from "uuid";
import { CiSearch } from "react-icons/ci";
import { SlClose } from "react-icons/sl";
import { useChatGifs } from "../../hooks/useChatGifs";

export function ChatGifs({ setOpenGiphy, setGifIcon, GifIcon }) {
  const {
    handleClear,
    sendGif,
    handleEntry,
    searchText,
    setSearchText,
    closeBtn,
    results,
    wrapperRef,
    containerRef,
  } = useChatGifs({
    setOpenGiphy,
    setGifIcon,
    GifIcon,
  });

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
