import React, { useEffect, useState } from "react";
import "./Username.css";
import { useSelector } from "react-redux";
import UsernamePopup from "./UsernamePopup";
import { useHistory } from "react-router-dom";

export default function Username({ username, user }) {
  const history = useHistory();
  const users = useSelector((state) => Object.values(state.users));

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
  return (
    <div className="username-component-wrapper">
      <div
        className="username-component"
        onClick={() => history.push(`/users/${user.id}/profile`)}
      >
        u/{username}
      </div>
      <UsernamePopup user={foundUser} />
    </div>
  );
}
