import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch, batch } from "react-redux";
import { getFollowers, getUserFollowers } from "../../store/followers";
import { getSubscriptions } from "../../store/subscriptions";
import Searchbar from "./Searchbar/Searchbar";
import NavUserDropdown from "./NavUserDropdown";
import NavLeftDropdownFace from "./NavLeftDropdown/NavLeftDropdownFace";
import RibbitLogo from "../../images/ribbit-banners/ribbit_logo_love.png";
import { getFavoriteCommunities } from "../../store/favorite_communities";
import { getFavoriteUsers } from "../../store/favorite_users";
import { getCommunities } from "../../store/communities";
import { getPosts } from "../../store/posts";
import { getMessages } from "../../store/messages";
import { getUserNotifications } from "../../store/notifications";
import NotificationsDropdownWrapper from "./NotificationsDropdown/NotificationsDropdownWrapper";
import RibbitLogoSmall from "../../images/ribbit-banners/ribbit_logo_love_small.png";
import LoginSignupModal from "../Modals/LoginSignupModal";
import { useState } from "react";
import { getUsers } from "../../store/users";
import { TfiPlus } from "react-icons/tfi";
import { BsChatDots } from "react-icons/bs";
import All from "../../images/navbar/all-icon2.png";
import LoggedOutDropdownWrapper from "./LoggedOutDropdown/LoggedOutDropdownWrapper";
import "./NavBar.css";

const NavBar = ({
  searchQuery,
  setSearchQuery,
  adjustQuery,
  pageTitle,
  setPageTitle,
  pageIcon,
  setPageIcon,
  setShowNavSidebar,
  setNormalDropdown,
  normalDropdown,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const notificationsList = useSelector((state) =>
    Object.values(state.notifications)
  );
  const messageList = useSelector((state) => Object.values(state.messages));

  const [notificationNum, setNotificationNum] = useState(0);
  const [msgNum, setMsgNum] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    batch(() => {
      dispatch(getUsers());
      dispatch(getSubscriptions());
      dispatch(getMessages());
      dispatch(getFavoriteCommunities());
      dispatch(getFavoriteUsers());
      dispatch(getUserFollowers(user?.id));
      dispatch(getFollowers());
      dispatch(getCommunities());
      dispatch(getPosts());
      dispatch(getUserNotifications(user?.id));
    });
  }, [dispatch, user?.id]);

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

  return (
    <nav className="navbar-nav">
      <ul>
        <li>
          <NavLink to="/" exact={true}>
            <img className="ribbit-logo-large" src={RibbitLogo} alt="Ribbit" />
          </NavLink>

          <NavLink to="/" exact={true}>
            <img
              className="ribbit-logo-small"
              src={RibbitLogoSmall}
              alt="Ribbit small"
            />
          </NavLink>
        </li>
        <li>
          {user && (
            <NavLeftDropdownFace
              pageTitle={pageTitle}
              setPageTitle={setPageTitle}
              pageIcon={pageIcon}
              setPageIcon={setPageIcon}
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
      />
      <div className="navbar-right">
        {user && (
          <div className="navbar-buttons">
            <div
              className="navbar-button"
              onClick={() => history.push("/c/all")}
            >
              <img
                src={All}
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
              onClick={() => history.push("/c/submit")}
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
          <LoginSignupModal btnText="Log In" className="navbar-login-btn" />
        )}
        {!user && <LoggedOutDropdownWrapper />}
        {user && <NavUserDropdown />}
      </div>
    </nav>
  );
};

export default NavBar;
