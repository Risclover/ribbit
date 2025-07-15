// src/features/chat/ChatNav.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchThreads } from "@/store/chatSlice";
import ChatNavItem from "./ChatNavItem";

export default function ChatNav() {
  const dispatch = useDispatch();
  const { threadOrder, threadsById, loading } = useSelector((s) => s.chat);

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  if (loading) return <div className="p-4">Loading…</div>;

  if (!threadOrder.length)
    return (
      <div className="p-4 text-gray-500">You don’t have any chats yet.</div>
    );

  return (
    <nav className="chat-nav w-80 border-r overflow-y-auto">
      {threadOrder.map((id) => (
        <ChatNavItem key={id} thread={threadsById[id]} />
      ))}
    </nav>
  );
}
