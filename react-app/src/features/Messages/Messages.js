import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../store/messages";
import { getThreads } from "../../store/threads";
import { Modal } from "../../context/Modal";
import MessageModal from "../../components/Modals/MessageModal";
import "./Messages.css";
import { getUsers } from "../../store/users";
import MessageThread from "./MessageThread";
import { useHistory } from "react-router-dom";
import MessageHead from "./MessageHead";
import MessageContentMenu from "./MessageContentMenu";
import { readAllNotifications } from "../../store/notifications";

export default function Messages({ setPageTitle }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const threads = useSelector((state) => Object.values(state.threads));
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getMessages());
    dispatch(getThreads());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Messages: Messages";
    setPageTitle(
      <div className="nav-left-dropdown-face-title">
        <img
          src={currentUser?.profile_img}
          className="nav-left-dropdown-item-icon item-icon-circle"
          alt="User"
        />
        <span className="nav-left-dropdown-item">Messages</span>
      </div>
    );
  }, [setPageTitle, currentUser?.profile_img]);

  useEffect(() => {
    dispatch(readAllNotifications());
  }, []);

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
