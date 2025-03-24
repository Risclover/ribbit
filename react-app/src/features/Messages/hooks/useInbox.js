import { usePageSettings } from "hooks";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readNotification } from "store";
import { readMessage } from "store";
import { getMessages } from "store";
import { getThreads } from "store";

export default function useInbox({ message }) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);
  const messages = useSelector((state) => Object.values(state.messages));
  const threads = useSelector((state) => state.threads);
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );

  const [expanded, setExpanded] = useState(true);
  const [markedUnread, setMarkedUnread] = useState(marked || false);

  const handleRead = async () => {
    setMarkedUnread(false);
    await dispatch(readNotification(message.id));
    await dispatch(readMessage(message.id));
  };

  const messageList = messages.concat(
    notifications.filter((item) => item.notificationType !== "message")
  );

  useEffect(() => {
    dispatch(getThreads());
    dispatch(getMessages());
  }, [dispatch]);

  usePageSettings({
    documentTitle: "inbox-messages: Inbox",
    icon: (
      <img
        src={currentUser?.profileImg}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="User"
      />
    ),
    pageTitle: "Messages",
  });

  messageList?.sort((a, b) => {
    let msgA = new Date(a.createdAt);
    let msgB = new Date(b.createdAt);
    return msgB - msgA;
  });

  return {
    threads,
    expanded,
    messageList,
    messages,
    handleRead,
    markedUnread,
    setMarkedUnread,
  };
}
