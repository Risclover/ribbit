import React, { useEffect, useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../store/users";
import { Modal } from "../../context/Modal";
import { SlClose } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import LoginForm from "../../features/auth/AuthModal/LoginForm";
import SignUpForm from "../../features/auth/AuthModal/SignUpForm";
import NavUserDropdown from "./NavUserDropdown";
import RibbitLogo from "../../images/ribbit-banners/ribbit_logo_love.png";
import "./NavBar.css";
import NavLeftDropdownFace from "./NavLeftDropdown/NavLeftDropdownFace";
import { getCommunities } from "../../store/communities";
import { getSubscriptions } from "../../store/subscriptions";
import { getFollowers, getUserFollowers } from "../../store/followers";
import HandleClickOutside from "../HandleClickOutside";

const NavBar = ({ searchQuery, setSearchQuery, adjustQuery }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const wrapperRef = useRef(null);
  const ref = useRef();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSubscriptions());
    dispatch(getUserFollowers(user?.id));
    dispatch(getFollowers());
  }, [dispatch]);

  useEffect(() => {
    if (adjustQuery) ref.current.focus();
  }, [adjustQuery]);

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const allUsers = useSelector((state) => state.users);
  const allCommunities = useSelector((state) => state.communities);

  let userList = [];

  for (let i = 0; i < Object.values(allUsers).length; i++) {
    userList.push({
      profile_img: Object.values(allUsers)[i].profile_img,
      username: Object.values(allUsers)[i].username,
      id: Object.values(allUsers)[i].id,
      karma: Object.values(allUsers)[i].karma,
    });
  }

  let communityList = [];

  for (let i = 0; i < Object.values(allCommunities).length; i++) {
    communityList.push({
      img: Object.values(allCommunities)[i].communityImg,
      name: Object.values(allCommunities)[i].name,
      members: Object.values(allCommunities)[i].members,
      communityImg: Object.values(allCommunities)[i].communityImg,
      id: Object.values(allCommunities)[i].id,
    });
  }

  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      HandleClickOutside(
        e,
        wrapperRef,
        showSearchDropdown,
        setShowSearchDropdown
      );
    });
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", function (e) {
        HandleClickOutside(
          e,
          wrapperRef,
          showSearchDropdown,
          setShowSearchDropdown
        );
      });
    };
  }, [wrapperRef]);

  useEffect(() => {
    dispatch(getUsers());

    if (searchQuery?.length === 0) {
      setShowSearchDropdown(false);
    }
  }, [dispatch, showSearchDropdown, searchQuery]);

  const handleQuery = async (e) => {
    e.preventDefault();
    setShowSearchDropdown(false);
    history.push("/search/results");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      return;
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true}>
            <img className="ribbit-logo" src={RibbitLogo} alt="Ribbit" />
          </NavLink>
        </li>
        <li>
          <NavLeftDropdownFace />
        </li>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/c/all" exact={true}>
            All
          </NavLink>
        </li>

        {/* {!user && (
          <li>
            <button onClick={() => setShowSignupForm(true)}>Sign Up</button>
          </li>
        )} */}
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
        {/* {user && (
          <li>
            <LogoutButton />
          </li>
        )} */}
      </ul>
      <div></div>
      {/* Search bar */}
      <div className="nav-search-bar" ref={wrapperRef}>
        <div className="nav-search-stuff">
          <div
            className={
              showSearchDropdown
                ? "nav-search-input-container search-input-focus"
                : "nav-search-input-container"
            }
          >
            <button className="nav-search-btn">
              <BsSearch />
            </button>
            <input
              ref={ref}
              autoFocus={adjustQuery}
              value={searchQuery}
              onKeyPress={handleEnter}
              onFocus={() => {
                setShowSearchDropdown(true);
              }}
              onChange={(e) => {
                setShowSearchDropdown(true);
                setSearchQuery(e.target.value);
              }}
              placeholder="Search Ribbit"
              className="nav-input"
            />
            <div
              className="search-close-icon"
              onClick={(e) => {
                setSearchQuery("");
                setShowSearchDropdown(false);
                let element = document.querySelector(".nav-input");
                element.focus();
              }}
            >
              <SlClose />
            </div>
          </div>
        </div>
        {showSearchDropdown && searchQuery.length > 0 && (
          <div className="nav-search-dropdown">
            {communityList.filter((community) =>
              community["name"]
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            ).length > 0 && (
              <div className="nav-search-section">
                <p>Communities</p>
                {communityList
                  .filter((community) =>
                    community["name"]
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  // .slice(0, 5)
                  .map((community) =>
                    community["name"]
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ? (
                      <div
                        className="search-result-community"
                        onClick={() => {
                          setShowSearchDropdown(false);
                          setSearchQuery("");
                          history.push(`/c/${community.id}`);
                        }}
                      >
                        <div className="search-result-community-img-box">
                          <img
                            src={community.communityImg}
                            className="search-result-community-img"
                          />
                        </div>
                        <div className="search-result-community-details">
                          <div className="search-result-community-name">
                            c/{community.name}
                          </div>
                          <div className="search-result-community-members">
                            Community • {community.members} members
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
              </div>
            )}
            {userList.filter((user) =>
              user["username"].toLowerCase().includes(searchQuery.toLowerCase())
            ).length > 0 && (
              <div className="nav-search-section">
                <p>Users</p>
                {userList
                  .filter((user) =>
                    user["username"]
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  // .slice(0, 5)
                  .map((user, idx) =>
                    idx < 6 &&
                    user["username"]
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ? (
                      <div
                        className="search-result-community"
                        onClick={() => {
                          setShowSearchDropdown(false);
                          setSearchQuery("");
                          history.push(`/users/${user.id}/profile`);
                        }}
                      >
                        {" "}
                        <div className="search-result-community-img-box">
                          <img
                            src={user.profile_img}
                            className="search-result-community-img"
                          />
                        </div>
                        <div className="search-result-community-details">
                          <div className="search-result-community-name">
                            u/{user.username}
                          </div>
                          <div className="search-result-community-members">
                            User • {user.karma} karma
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
              </div>
            )}

            <div className="search-for-query" onClick={handleQuery}>
              <BsSearch /> Search for "{searchQuery}"
            </div>
          </div>
        )}
      </div>
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
