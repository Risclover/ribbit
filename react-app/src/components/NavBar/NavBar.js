import React, { useEffect, useReducer, useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SlClose } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { search } from "../../store/search";
import { Modal } from "../../context/Modal";
import LoginForm from "../../features/auth/AuthModal/LoginForm";
import SignUpForm from "../../features/auth/AuthModal/SignUpForm";
import LogoutButton from "../../features/auth/LogoutButton";
import NavUserDropdown from "./NavUserDropdown";
import RibbitLogo from "../../images/ribbit-banners/ribbit_logo_love.png";
import "./NavBar.css";
import { getUsers } from "../../store/users";

const NavBar = ({ searchQuery, setSearchQuery }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const wrapperRef = useRef(null);

  const products = useSelector((state) => Object.values(state.search));
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
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    console.log(products);
    dispatch(getUsers());

    if (searchQuery?.length === 0) {
      setShowSearchDropdown(false);
    }
  }, [showSearchDropdown, searchQuery]);

  const handleQuery = async (e) => {
    e.preventDefault();
    setSearchValue(searchQuery);
    setResults(await dispatch(search(searchQuery)).query);
    setShowSearchDropdown(false);
    history.push("/search/results");
    console.log(results);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      return;
    }
  };

  console.log(
    "comm",
    communityList
      .filter((community) =>
        community["name"].toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5)
  );

  console.log(communityList);
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true}>
            <img className="ribbit-logo" src={RibbitLogo} />
          </NavLink>
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
              value={searchQuery}
              onKeyPress={handleEnter}
              onFocus={() => setShowSearchDropdown(true)}
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
                        <div
                          className="search-result-community-img"
                          style={{
                            backgroundImage: `url(${community.communityImg})`,
                          }}
                        >
                          &nbsp;
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
                        <div
                          className="search-result-community-img"
                          style={{
                            backgroundImage: `url(${user.profile_img})`,
                          }}
                        >
                          &nbsp;
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

            {/* <div className="search-for-query" onClick={handleQuery}>
              <BsSearch /> Search for "{searchQuery}"
            </div> */}
          </div>
        )}
      </div>
      {!user && (
        <button className="loginsignup" onClick={() => setShowLoginForm(true)}>
          Login/Sign Up
        </button>
      )}
      {user && <NavUserDropdown />}
    </nav>
  );
};

export default NavBar;
