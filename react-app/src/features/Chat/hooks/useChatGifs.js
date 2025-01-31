// import { useCallback, useContext, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { GiphyFetch } from "@giphy/js-fetch-api";
// import { SelectedChatContext } from "@/context";
// import { createChatMessage, getChatThread } from "@/store";

// const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);

// export function useChatGifs({
//   receiver,
//   setOpenGiphy,
//   setGifIcon,
//   GifIcon,
//   socket,
// }) {
//   const dispatch = useDispatch();
//   const { selectedChat } = useContext(SelectedChatContext);

//   const [results, setResults] = useState([]);
//   const [text, setText] = useState("");
//   const [offset, setOffset] = useState(0);
//   const [query, setQuery] = useState("");
//   const [closeBtn, setCloseBtn] = useState(false);

//   const loadMore = useCallback(async () => {
//     const res = await giphy.search(query, { offset, limit: 10 });
//     setResults((prevResults) => [...prevResults, ...res.data]);
//     setOffset(offset + 10);
//   }, [offset, query]);

//   const handleScroll = () => {
//     if (
//       containerRef.current &&
//       containerRef.current.scrollTop + containerRef.current.clientHeight >=
//         containerRef.current.scrollHeight
//     ) {
//       if (query && query.length > 0) {
//         loadMore();
//       } else {
//         initialFill();
//       }
//     }
//   };

//   const handleEntry = (e) => {
//     if (e.key === "Enter") {
//       setResults([]);
//       setOffset(0);
//       setQuery(text);
//       loadMore();
//     }
//   };

//   const initialFill = async () => {
//     const res = await giphy.trending({ offset, limit: 10 });
//     setResults((prev) => [...prev, ...res.data]);
//     setOffset(offset + 10);
//   };

//   useEffect(() => {
//     if (query) {
//       setResults([]);
//       setOffset(0);
//       loadMore();
//     } else {
//       initialFill();
//     }
//   }, [query]);

//   useEffect(() => {
//     if (text.length > 0) {
//       setCloseBtn(true);
//     }
//   }, [text]);

//   const sendGif = async (e) => {
//     const chatThreadId = selectedChat?.id;

//     const payload = {
//       content: e.target.src,
//       receiverId: receiver.id,
//       chatThreadId: chatThreadId,
//     };

//     const data = await dispatch(createChatMessage(payload));
//     data.room = chatThreadId;
//     await socket.emit("chat", data);
//     dispatch(getChatThread(chatThreadId));
//     setOpenGiphy(false);
//     setGifIcon(GifIcon);
//   };

//   const handleClear = (e) => {
//     e.preventDefault();
//     setText("");
//     setQuery("");
//     setResults([]);
//     setOffset(0);
//     initialFill();
//     inputRef.current.focus();
//   };

//   return {
//     text,
//     handleClear,
//     sendGif,
//     handleEntry,
//     handleScroll,
//     results,
//     closeBtn,
//   };
// }

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { createChatMessage, getChatThread } from "@/store";

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
  const dispatch = useDispatch();

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
    // “receiver” means we do have a selected chat
    // The assumption is, you must have a selected chat to send a gif
    const chatThreadId = receiver.chatThreads?.[0] || null;
    // ^ or find your own logic for the threadId from context, etc.
    // If you store the selectedChat in context, you can just read that ID directly.

    // For simplicity, let's assume you have the selected chat from context if needed
    // and pass it in as a prop. Or just do:
    // const chatThreadId = selectedChat?.id;

    const payload = {
      content: gifUrl,
      receiverId: receiver.id,
      chatThreadId,
    };

    const data = await dispatch(createChatMessage(payload));
    data.room = chatThreadId;
    socket.emit("chat", data);
    dispatch(getChatThread(chatThreadId));
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
