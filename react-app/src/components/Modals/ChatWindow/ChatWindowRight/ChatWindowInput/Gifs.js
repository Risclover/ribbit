import React, { useCallback, useEffect, useRef, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useDispatch } from "react-redux";
import { createChatMessage, getChatThread } from "../../../../../store/chats";
import { CiSearch } from "react-icons/ci";
import { queryAllByAltText } from "@testing-library/react";
import { SlClose } from "react-icons/sl";

const giphy = new GiphyFetch("fiQieMg1iTSB2Jvd4njUzeY2W3PP99I1");

export default function Gifs({
  receiver,
  selectedChat,
  setOpenGiphy,
  gifIcon,
  setGifIcon,
  GifIcon,
  GifIconDark,
}) {
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [text, setText] = useState("");
  const [offset, setOffset] = useState(0);
  const [err, setErr] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [closeBtn, setCloseBtn] = useState(false);

  const loadMore = useCallback(async () => {
    const res = await giphy.search(query, { offset, limit: 10 });
    setResults((prevResults) => [...prevResults, ...res.data]);
    setOffset(offset + 10);
  }, [offset, query]);

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight
    ) {
      if (query && query.length > 0) {
        loadMore();
      } else {
        initialFill();
      }
    }
  };

  const handleClickOutside = (e) => {
    const container = containerRef.current;

    if (container && !container.contains(e.target)) {
      setOpenGiphy(false);
      setGifIcon(GifIcon);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      document.addEventListener("click", handleClickOutside);
      return () => {
        container.removeEventListener("scroll", handleScroll);
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [handleScroll]);

  const handleEntry = (e) => {
    if (e.key === "Enter") {
      setResults([]);
      setOffset(0);
      setQuery(text);
      loadMore();
    }
  };

  const initialFill = async () => {
    const res = await giphy.trending({ offset, limit: 10 });
    setResults((prev) => [...prev, ...res.data]);
    setOffset(offset + 10);
  };

  useEffect(() => {
    if (query) {
      setResults([]);
      setOffset(0);
      loadMore();
    } else {
      initialFill();
    }
  }, [query]);

  useEffect(() => {
    if (text.length > 0) {
      setCloseBtn(true);
    }
  }, [text]);

  const sendGif = async (e) => {
    const payload = {
      content: e.target.src,
      receiverId: receiver.id,
      chatThreadId: selectedChat.id,
    };

    dispatch(createChatMessage(payload));
    setOpenGiphy(false);
    dispatch(getChatThread(selectedChat.id));
    setGifIcon(GifIcon);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setText("");
    setQuery("");
    setResults([]);
    setOffset(0);
    initialFill();
    inputRef.current.focus();
    // setOpenGiphy(true);
  };

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
          <button className="giphy-input-close" onClick={(e) => handleClear(e)}>
            <SlClose />
          </button>
        )}
      </div>
      <div className="giphy-results">
        {results.map((gif) => (
          <img
            src={gif.images?.original.url}
            className="giphy-gif"
            onClick={sendGif}
          />
        ))}
      </div>
    </div>
  );
}