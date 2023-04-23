import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMessages } from "../../store/messages";
import { createMessage, getThreads, readMessage } from "../../store/threads";
import moment from "moment";
import { Modal } from "../../context/Modal";
import MessageModal from "../../components/Modals/MessageModal";
import MessageReply from "./MessageReply";
import "./Messages.css";
export default function Messages({ setPageTitle }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => Object.values(state.messages));
  const threads = useSelector((state) => Object.values(state.threads));

  useEffect(() => {
    dispatch(getMessages());
    dispatch(getThreads());
    setPageTitle("Messages");
  }, []);

  const handleReply = (e) => {
    e.preventDefault();
  };

  console.log(threads);
  threads.sort((a, b) => {
    let aThread = new Date(a.updatedAt);
    let bThread = new Date(b.updatedAt);

    return bThread - aThread;
  });

  console.log(threads);
  return (
    <div className="messages-page">
      <div className="messages-header">
        <ul className="messages-main-menu">
          <li className="messages-main-menu-item">Send A Private Message</li>
          <li className="messages-main-menu-item">Inbox</li>
          <li className="messages-main-menu-item">Sent</li>
        </ul>
      </div>
      <div className="messages-content">
        <div className="messages-content-menu">
          <ul className="messages-content-menu-list">
            <li className="messages-content-menu-list-item">All</li>
            <li className="messages-content-menu-list-item">Unread</li>
            <li className="messages-content-menu-list-item">Messages</li>
            <li className="messages-content-menu-list-item">Post Replies</li>
          </ul>
        </div>
        <div className="messages-content-main">
          {threads.map((item) => (
            <div className="messages-content-item">
              <div className="messages-content-subject-box">
                <div className="messages-content-sender">
                  <NavLink to={`/users/${item.users[1].id}/profile`}>
                    /u/{item.users[1].username}
                  </NavLink>
                </div>
                <div className="messages-content-subject">{item.subject}:</div>
              </div>
              <div className="messages-content-message-list">
                {item.messages.map((message) => (
                  <div className="messages-content-message">
                    <div className="messages-content-message-author">
                      from{" "}
                      <NavLink to={`/users/${message.sender.id}/profile`}>
                        /u/{message.sender.username}
                      </NavLink>{" "}
                      sent {moment(message.createdAt).fromNow()}
                    </div>
                    <div className="messages-content-message-body">
                      {message.content}
                    </div>
                    <MessageReply message={message} threadId={item.id} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
