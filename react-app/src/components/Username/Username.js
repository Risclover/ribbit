import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UsernamePopup } from "./UsernamePopup";
import "./Username.css";
import { usePopup } from "../../context/Popup";

export function Username({ community, username, user, source }) {
  const history = useHistory();

  const users = useSelector((state) => Object.values(state.users));
  const currentUser = useSelector((state) => state.session.user);

  let foundUser = users.filter((user) => user.username === username);

  const [showPopup, setShowPopup] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);
  const { isPopupOpen, setIsPopupOpen } = usePopup(); // Access the global popup state

  const handleMouseEnter = () => {
    if (foundUser[0].id === currentUser?.id) {
      return;
    }
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    if (!isPopupOpen) {
      // Check if another popup is open
      setShowPopup(true);
      setIsPopupOpen(true); // Set popup open state
    }
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowPopup(false);
      setIsPopupOpen(false); // Reset popup open state
    }, 200); // 1000ms = 1 second
    setHideTimeout(timeout);
  };

  const handleUsernameClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    history.push(`/users/${user.id}/profile`);
  };

  return (
    <div
      className="username-component-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="username-component" onClick={handleUsernameClick}>
        {source === "singlepost" ? "u/" + username : username}
      </div>

      {showPopup && <UsernamePopup community={community} user={foundUser} />}
    </div>
  );
}
