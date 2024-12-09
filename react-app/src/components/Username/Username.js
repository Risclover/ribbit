import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { UsernamePopup } from "./UsernamePopup";
import "./Username.css";
import { usePopup } from "@/context";

export function Username({ community, username, user, source }) {
  const history = useHistory();

  const users = useSelector((state) => Object.values(state.users));
  const currentUser = useSelector((state) => state.session.user);

  let foundUser = users.filter((user) => user.username === username);

  const [showPopup, setShowPopup] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);
  const { isPopupOpen, setIsPopupOpen } = usePopup(); // Access the global popup state

  const handleMouseEnter = () => {
    if (foundUser[0]?.id === currentUser?.id) {
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

  const handleNameClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="username-component-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink
        onClick={handleNameClick}
        to={`/users/${user.id}/profile`}
        className="username-component"
      >
        {source === "singlepost" ? "u/" + username : username}
      </NavLink>

      {showPopup && <UsernamePopup community={community} user={foundUser} />}
    </div>
  );
}
