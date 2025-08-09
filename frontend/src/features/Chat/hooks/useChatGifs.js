import { useCallback } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useChat } from "@/context";
import { createChatMessage, getChatThread, useAppDispatch } from "@/store";

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);

export function useChatGifs({
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
}) {
  const dispatch = useAppDispatch();
  const { selectedChat } = useChat();

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
    handleScroll,
    loadTrending,
    loadSearch,
  };
}
