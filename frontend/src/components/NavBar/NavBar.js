import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { TfiPlus } from "react-icons/tfi";
import { BsChatDots } from "react-icons/bs";

import {
  NavUserDropdown,
  NavLeftDropdownFace,
  LoggedOutDropdownWrapper,
} from ".";
import { SelectedChatContext } from "@/context";
import { Searchbar, NotificationBell } from "@/features";
import { AllPostsIcon } from "@/assets";

import { ribbitBanners, ribbitLogos } from "@/assets";
import { RandomLogo } from "../../layouts/RandomLogo";
import "./NavBar.css";
import "../../features/NewSearch/Search.css";
import { useAuthFlow } from "@/context/AuthFlowContext";
import { LoggedOutNavBar } from "./MobileNavbar";
import { NavBarBtns } from "./NavBarBtns";
import { OpenChatContext } from "context/OpenChatContext";

export function NavBar({
  adjustQuery,
  searchQuery,
  setSearchQuery,
  setShowNavSidebar,
  showDropdown,
  setShowDropdown,
  searchbarRef,
  showNavSidebar,
  minimizeChat,
  setMinimizeChat,
}) {
  const { openLogin } = useAuthFlow();
  const history = useHistory();

  const { setSelectedChat } = useContext(SelectedChatContext);
  const { openChat, setOpenChat } = useContext(OpenChatContext);

  const chatThreads = useSelector((state) => state.chatThreads);
  const user = useSelector((state) => state.session.user);
  const notificationsList = useSelector((state) =>
    Object.values(state.notifications)
  );
  const messageList = useSelector((state) => Object.values(state.messages));

  const [notificationNum, setNotificationNum] = useState(0);
  const [msgNum, setMsgNum] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    let list = messageList.filter((message) => message.read === false);
    setNotificationNum(
      list.length +
        notificationsList.filter(
          (notification) =>
            notification.read === false &&
            notification.senderId !== user?.id &&
            notification.notificationType !== "message"
        ).length
    );

    setMsgNum(messageList.filter((message) => message.read === false).length);
  });

  const sortedThreads = Object.values(chatThreads).sort((a, b) => {
    const aMessages = a.messages;
    const bMessages = b.messages;
    if (aMessages && bMessages) {
      const aLastMessage = aMessages[aMessages?.length - 1];
      const bLastMessage = bMessages[bMessages?.length - 1];

      if (aMessages?.length === 0 && bMessages?.length === 0) {
        return a.createdAt.localeCompare(b.createdAt);
      }

      if (aMessages?.length === 0) {
        return 1;
      }

      if (bMessages?.length === 0) {
        return -1;
      }

      return (
        new Date(bLastMessage.createdAt) - new Date(aLastMessage.createdAt)
      );
    }
  });

  const handleOpenChat = (e) => {
    e.preventDefault();
    setSelectedChat(sortedThreads[0]);

    if (minimizeChat) {
      setMinimizeChat(false);
    } else {
      setOpenChat(!openChat);
    }
  };

  return (
    <nav className="navbar-nav">
      <ul>
        <li>
          <NavLink to="/" exact={true}>
            <RandomLogo banners={ribbitBanners} logos={ribbitLogos} />
          </NavLink>
        </li>
        <li>
          {user && (
            <NavLeftDropdownFace
              setShowNavSidebar={setShowNavSidebar}
              setShowDropdown={setShowDropdown}
              showDropdown={showDropdown}
              showNavSidebar={showNavSidebar}
            />
          )}
        </li>
      </ul>
      <div></div>
      <Searchbar loggedIn={user ? true : false} searchbarRef={searchbarRef} />
      <div className="navbar-right">
        {user && (
          <NavBarBtns
            showTooltip={showTooltip}
            setShowTooltip={setShowTooltip}
            handleOpenChat={handleOpenChat}
          />
        )}
        {!user && (
          <button className="navbar-login-btn" onClick={openLogin}>
            Log In
          </button>
        )}

        {!user && <LoggedOutDropdownWrapper />}
        {user && <NavUserDropdown />}
      </div>
    </nav>
  );
}
