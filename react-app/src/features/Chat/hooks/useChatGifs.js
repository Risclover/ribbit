import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { SelectedChatContext } from "@/context";
import { createChatMessage } from "store";
import { getChatThread } from "store";

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);

export function useChatGifs({
  receiver,
  setOpenGiphy,
  setGifIcon,
  GifIcon,
  socket,
}) {
  const dispatch = useDispatch();
  const { selectedChat } = useContext(SelectedChatContext);

  const [results, setResults] = useState([]);
  const [text, setText] = useState("");
  const [offset, setOffset] = useState(0);
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
  };

  return {
    text,
    handleClear,
    sendGif,
    handleEntry,
    handleScroll,
    results,
    closeBtn,
  };
}
