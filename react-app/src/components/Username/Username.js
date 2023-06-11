import React, { useEffect, useState } from "react";
import "./Username.css";
import { useSelector } from "react-redux";
import UsernamePopup from "./UsernamePopup";
import { useHistory } from "react-router-dom";

export default function Username({ username, user }) {
  const history = useHistory();

  const users = useSelector((state) => Object.values(state.users));
  const currentUser = useSelector(state => state.session.user);

  const [showUserBox, setShowUserBox] = useState(false);

  let foundUser = users.filter((user) => user.username === username);

  const handleShow = () => {
    setTimeout(() => {
      setShowUserBox(true);
    }, 500);
  };

  const handleLeave = () => {
    setTimeout(() => {
      setShowUserBox(false);
    }, 500);
  };

  const handleUsernameClick = (e) => {
    let isInputClicked = false;
    const checkForInput = (element) => {
      if (element.tagName === "INPUT") {
        isInputClicked = true;
      } else if (element.parentNode) {
        checkForInput(element.parentNode);
      }
    };

    checkForInput(e.target);

    if (!isInputClicked && user && user.id) {
      e.preventDefault();
      history.push(`/users/${user.id}/profile`);
    }
  };

  return (
    <div className="username-component-wrapper">
      <div className="username-component" onClick={handleUsernameClick}>
        u/{username}
      </div>
      {foundUser.length > 0 && currentUser && currentUser.id !== foundUser[0].id && (
  <UsernamePopup user={foundUser} setShowUserBox={setShowUserBox} />
)}
    </div>
  );
}
