import { useCallback, useRef, useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useChat } from "@/context";
import {
  createChatMessage,
  getChatThread,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { getSocket } from "@/socket";
import { useOutsideClick } from "@/hooks";

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);

export function useChatGifs({ setOpenGiphy, setGifIcon, GifIcon }) {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  const dispatch = useAppDispatch();
  const { selectedChat } = useChat();
  const socket = getSocket();
  const currentUser = useAppSelector((state) => state.session.user);

  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [closeBtn, setCloseBtn] = useState(false);
  const [offset, setOffset] = useState(0);

  const receiver = selectedChat.users.find((u) => u.id !== currentUser.id);

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

  const loadTrending = useCallback(async () => {
    setResults([]);
    setOffset(0);
    const res = await giphy.trending({ offset: 0, limit: 20 });
    setResults(res.data);
    setOffset(20);
  }, [setResults, setOffset]);

  const loadSearch = useCallback(async () => {
    if (!searchText) return;
    setResults([]);
    setOffset(0);
    const res = await giphy.search(searchText, { offset: 0, limit: 20 });
    setResults(res.data);
    setOffset(20);
  }, [searchText, setResults, setOffset]);

  const loadMore = async () => {
    if (!searchText) {
      // trending
      const res = await giphy.trending({ offset, limit: 10 });
      setResults((prev) => [...prev, ...res.data]);
      setOffset(offset + 10);
    } else {
      // searching
      const res = await giphy.search(searchText, { offset, limit: 10 });
      setResults((prev) => [...prev, ...res.data]);
      setOffset(offset + 10);
    }
  };

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      loadMore();
    }
  };

  const handleEntry = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!searchText.trim()) {
        loadTrending();
      } else {
        loadSearch();
      }
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setSearchText("");
    setResults([]);
    setOffset(0);
    loadTrending();
  };

  const sendGif = async (gifUrl) => {
    if (!receiver) return;
    const chatThreadId = selectedChat?.id;

    const payload = {
      content: gifUrl,
      receiverId: receiver.id,
      chatThreadId,
    };

    const data = await dispatch(createChatMessage(payload));
    data.room = chatThreadId;
    socket.emit("chat", data);
    setOpenGiphy(false);
    setGifIcon(GifIcon);
  };

  return {
    handleClear,
    sendGif,
    handleEntry,
    searchText,
    setSearchText,
    closeBtn,
    results,
    wrapperRef,
    containerRef,
  };
}
