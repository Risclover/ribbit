import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  getThreads,
  getUsers,
  readAllNotifications,
} from "@/store";
import { MessageThread, MessageHead, MessageContentMenu } from "..";
import { usePageSettings } from "@/hooks/usePageSettings";
import "./Messages.css";

export function Messages() {
  const dispatch = useDispatch();

  const threads = useSelector((state) => Object.values(state.threads));
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getMessages());
    dispatch(getThreads());
    dispatch(getUsers());
    dispatch(readAllNotifications());
  }, [dispatch]);

  usePageSettings({
    documentTitle: "Messages: Messages",
    icon: (
      <img
        src={currentUser?.profileImg}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="User"
      />
    ),
    pageTitle: "Messages",
  });

  threads.sort((a, b) => {
    let aThread = new Date(a.updatedAt);
    let bThread = new Date(b.updatedAt);

    return bThread - aThread;
  });

  return (
    <div className="messages-page">
      <MessageHead />
      <div className="messages-content">
        <MessageContentMenu active="Messages" />
        <div className="messages-content-main">
          {threads.map((item) => (
            <MessageThread item={item} />
          ))}
          {threads.length === 0 && (
            <div className="messages-page-content-nothing">
              there doesn't seem to be anything here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
