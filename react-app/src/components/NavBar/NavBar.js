import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";

import { getFollowers, getUserFollowers } from "../../store/followers";
import { getSubscriptions } from "../../store/subscriptions";

import Searchbar from "./Searchbar/Searchbar";
import NavUserDropdown from "./NavUserDropdown";
import NavLeftDropdownFace from "./NavLeftDropdown/NavLeftDropdownFace";
import LoginForm from "../../features/auth/AuthModal/LoginForm";
import SignUpForm from "../../features/auth/AuthModal/SignUpForm";

import RibbitLogo from "../../images/ribbit-banners/ribbit_logo_love.png";

import "./NavBar.css";
import { getFavoriteCommunities } from "../../store/favorite_communities";
import { getFavoriteUsers } from "../../store/favorite_users";
import { getCommunities } from "../../store/communities";

const NavBar = ({
  searchQuery,
  setSearchQuery,
  adjustQuery,
  pageTitle,
  setPageTitle,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getFavoriteCommunities());
    dispatch(getFavoriteUsers());
    dispatch(getUserFollowers(user?.id));
    dispatch(getFollowers());
    dispatch(getCommunities());
  }, [dispatch]);

  return (
    <nav>
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
        {showLoginForm && (
          <Modal title="Log In" onClose={() => setShowLoginForm(false)}>
            <LoginForm
              setShowLoginForm={setShowLoginForm}
              showLoginForm={showLoginForm}
              showSignupForm={showSignupForm}
              setShowSignupForm={setShowSignupForm}
            />
          </Modal>
        )}
        {showSignupForm && (
          <Modal title="Sign Up" onClose={() => setShowSignupForm(false)}>
            <SignUpForm
              setShowLoginForm={setShowLoginForm}
              showLoginForm={showLoginForm}
              showSignupForm={showSignupForm}
              setShowSignupForm={setShowSignupForm}
            />
          </Modal>
        )}
      </ul>
      <div></div>
      <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        adjustQuery={adjustQuery}
      />
      {!user && (
        <button
          className="blue-btn-filled loginsignup"
          onClick={() => setShowLoginForm(true)}
        >
          Log In/Sign Up
        </button>
      )}
      {user && <NavUserDropdown />}
    </nav>
  );
};

export default NavBar;
