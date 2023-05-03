import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getFollowers, getUserFollowers } from "../../store/followers";
import { getSubscriptions } from "../../store/subscriptions";

import Searchbar from "./Searchbar/Searchbar";
import NavUserDropdown from "./NavUserDropdown";
import NavLeftDropdownFace from "./NavLeftDropdown/NavLeftDropdownFace";
import RibbitLogo from "../../images/ribbit-banners/ribbit_logo_love.png";

import "./NavBar.css";
import { getFavoriteCommunities } from "../../store/favorite_communities";
import { getFavoriteUsers } from "../../store/favorite_users";
import { getCommunities } from "../../store/communities";
import { getPosts } from "../../store/posts";
import { getMessages } from "../../store/messages";
import { getUserNotifications } from "../../store/notifications";
import NotificationsDropdownWrapper from "./NotificationsDropdown/NotificationsDropdownWrapper";
import LoginSignupModal from "../Modals/LoginSignupModal";

const NavBar = ({
  searchQuery,
  setSearchQuery,
  adjustQuery,
  pageTitle,
  setPageTitle,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getMessages());
    dispatch(getFavoriteCommunities());
    dispatch(getFavoriteUsers());
    dispatch(getUserFollowers(user?.id));
    dispatch(getFollowers());
    dispatch(getCommunities());
    dispatch(getPosts());
    dispatch(getUserNotifications(user?.id));
  }, [dispatch, user?.id]);

  return (
    <nav className="navbar-nav">
      <ul>
        <li>
          <NavLink to="/" exact={true}>
            <img className="ribbit-logo" src={RibbitLogo} alt="Ribbit" />
          </NavLink>
        </li>
        <li>
          {user && (
            <NavLeftDropdownFace
              pageTitle={pageTitle}
              setPageTitle={setPageTitle}
            />
          )}
        </li>
        <li>
          {user && (
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          )}
        </li>
        <li>
          {user && (
            <NavLink to="/c/all" exact={true}>
              All
            </NavLink>
          )}
        </li>
      </ul>
      <div></div>
      <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        adjustQuery={adjustQuery}
      />
      {user && (
        <div className="notification-wrapper">
          <NotificationsDropdownWrapper />
        </div>
      )}
      {!user && (
        <LoginSignupModal
          btnText="Log In/Sign Up"
          className="blue-btn-filled btn-long"
        />
      )}
      {user && <NavUserDropdown />}
    </nav>
  );
};

export default NavBar;
