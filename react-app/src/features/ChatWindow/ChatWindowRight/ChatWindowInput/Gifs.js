import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { CiSearch } from "react-icons/ci";
import { SlClose } from "react-icons/sl";
import { createChatMessage, getChatThread } from "@/store";
import "./ChatWindowInput.css";
import { SelectedChatContext } from "@/context";
import { useOutsideClick } from "hooks";
import { v4 as uuidv4 } from "uuid";

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);

export function Gifs({ receiver, setOpenGiphy, setGifIcon, GifIcon, socket }) {
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [text, setText] = useState("");
  const [offset, setOffset] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [closeBtn, setCloseBtn] = useState(false);
  const { selectedChat } = useContext(SelectedChatContext);

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

  // const handleClickOutside = (e) => {
  //   const container = containerRef.current;

  //   if (container && !container.contains(e.target)) {
  //     setOpenGiphy(false);
  //     setGifIcon(GifIcon);
  //   }
  // };

  useOutsideClick(containerRef, () => setOpenGiphy(false));

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
    const chatThreadId = selectedChat?.id;

    const payload = {
      content: e.target.src,
      receiverId: receiver.id,
      chatThreadId: chatThreadId,
    };

    const data = await dispatch(createChatMessage(payload));
    data.room = chatThreadId;
    await socket.emit("chat", data);
    dispatch(getChatThread(chatThreadId));
    setOpenGiphy(false);
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
