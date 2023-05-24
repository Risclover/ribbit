import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageHead from "../MessageHead";
import { getThreads } from "../../../store/threads";
import SentMessage from "./SentMessage";
import "./Sent.css";

export default function Sent({ setPageTitle, setPageIcon }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const threads = useSelector((state) => Object.values(state.threads));

  useEffect(() => {
    dispatch(getThreads());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Messages: Sent";
    setPageIcon(
      <img
        src={currentUser?.profile_img}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="User"
      />
    );
    setPageTitle(<span className="nav-left-dropdown-item">Messages</span>);
  }, [setPageTitle, setPageIcon, currentUser?.profile_img]);

  let nothingHere = threads.map((thread) =>
    thread.messages.filter((message) => message.sender.id === currentUser.id)
  );

  return (
    <div className="messages-page">
      <MessageHead active="Sent" />
      <div className="messages-content">
        <div className="sent-messages">
          {threads.map((thread) =>
            thread.messages
              .filter((message) => message.sender.id === currentUser.id)
              .map((message, idx) => (
                <SentMessage
                  message={message}
                  firstMessage={idx === 0}
                  recipient={thread.users[0]}
                  threadId={thread.id}
                />
              ))
              .sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
          )}
        </div>
        {nothingHere.length === 0 && (
          <div className="messages-content-nothing">
            there doesn't seem to be anything here
          </div>
        )}
      </div>
    </div>
  );
}
