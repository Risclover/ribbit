// src/features/chat/ChatNavItem.jsx
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";

export default function ChatNavItem({ thread }) {
  const { partner, lastMessage } = thread;
  return (
    <NavLink
      to={`/chat/${thread.id}`}
      className="chat-nav-item flex gap-2 p-2 hover:bg-gray-100"
    >
      <img
        src={partner.avatarUrl}
        alt={`${partner.username}'s avatar`}
        className="h-10 w-10 rounded-full"
      />
      <div className="flex-1 truncate text-left">
        <div className="flex justify-between">
          <span className="font-medium">{partner.username}</span>
          {lastMessage.timestamp && (
            <time
              dateTime={lastMessage.timestamp}
              className="text-xs text-gray-500"
            >
              {dayjs(lastMessage.timestamp).fromNow()}
            </time>
          )}
        </div>
        <p className="truncate text-sm text-gray-600">
          {lastMessage.body || "No messages yet…"}
        </p>
      </div>
    </NavLink>
  );
}
