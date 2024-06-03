import React from "react";
import { useSelector } from "react-redux";

export const ChatNavBtn = ({ chatThread, setSelectedChat }) => {
  const currentUser = useSelector((state) => state.session.user);
  const recipient = chatThread.users.find((user) => user.id !== currentUser.id);

  return (
    <div onClick={() => setSelectedChat(chatThread.id)}>
      {recipient.username}
    </div>
  );
};
