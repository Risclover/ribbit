import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MessageContentMenu from "./MessageContentMenu";
import MessageHead from "./MessageHead";

export default function Sent({ setPageTitle }) {
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    document.title = "Messages: Sent";
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

  return (
    <div className="messages-page">
      <MessageHead />
      <div className="messages-content">
        <MessageContentMenu active="Sent" />
        <div className="messages-content-nothing">
          there doesn't seem to be anything here
        </div>
      </div>
    </div>
  );
}
