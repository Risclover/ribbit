import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TfiPlus } from "react-icons/tfi";
import { BsChatDots } from "react-icons/bs";

import { getCommunities, getMessages, getUsers } from "../../store";
import {
  NavUserDropdown,
  NavLeftDropdownFace,
  NotificationsDropdownWrapper,
  LoggedOutDropdownWrapper,
} from "../NavBar";
import { SelectedChatContext } from "../../context";
import { Searchbar, LoginSignupModal } from "../../features";
import { AllIcon } from "../../assets";

import { ribbitBanners, ribbitLogos } from "../../assets";
import "./NavBar.css";
import { RandomLogo } from "../RandomLogo";

export function NavBar({
  adjustQuery,
  searchQuery,
  setSearchQuery,
  setShowNavSidebar,
  normalDropdown,
  setNormalDropdown,
  setOpenChat,
  openChat,
  searchbarRef,
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { setSelectedChat } = useContext(SelectedChatContext);

  const chatThreads = useSelector((state) => state.chatThreads);
  const user = useSelector((state) => state.session.user);
  const notificationsList = useSelector((state) =>
    Object.values(state.notifications)
  );
  const messageList = useSelector((state) => Object.values(state.messages));

  const [notificationNum, setNotificationNum] = useState(0);
  const [msgNum, setMsgNum] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  // useEffect(() => {
  //   dispatch(getCommunities());
  //   dispatch(getUsers());
  //   dispatch(getMessages());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    let list = messageList.filter((message) => message.read === false);
    setNotificationNum(
      list.length +
        notificationsList.filter(
          (notification) =>
            notification.read === false &&
            notification.senderId !== user?.id &&
            notification.type !== "message"
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
    setOpenChat(!openChat);
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
              setNormalDropdown={setNormalDropdown}
              normalDropdown={normalDropdown}
            />
          )}
        </li>
      </ul>
      <div></div>
      <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        adjustQuery={adjustQuery}
        loggedIn={user ? true : false}
        searchbarRef={searchbarRef}
      />
      <div className="navbar-right">
        {user && (
          <div className="navbar-buttons">
            <div
              className="navbar-button"
              onClick={() => history.push("/c/all")}
            >
              <img
                src={AllIcon}
                className="nav-left-dropdown-item-icon"
                alt="All"
              />
              {showTooltip && (
                <span className="navbtn-tooltiptext">/c/All</span>
              )}
            </div>
            <div
              className="navbar-button"
              onMouseEnter={() => setTimeout(() => setShowTooltip(true), 500)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={handleOpenChat}
            >
              <BsChatDots />
              {showTooltip && <span className="navbtn-tooltiptext">Chat</span>}
            </div>
            {user && (
              <div className="notification-wrapper">
                <NotificationsDropdownWrapper
                  msgNum={msgNum}
                  notificationNum={notificationNum}
                />
              </div>
            )}
            <div
              className="navbar-button"
              onClick={() => history.push("/submit")}
              onMouseEnter={() => setTimeout(() => setShowTooltip(true), 500)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <TfiPlus />
              {showTooltip && (
                <span className="navbtn-tooltiptext text2">Create Post</span>
              )}
            </div>
          </div>
        )}
        {!user && (
          <LoginSignupModal
            btnText="Log In"
            className="navbar-login-btn"
            formType="login"
          />
        )}
        {!user && <LoggedOutDropdownWrapper />}
        {user && <NavUserDropdown />}
      </div>
    </nav>
  );
}
