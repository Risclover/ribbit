import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UsernamePopup } from "./UsernamePopup";
import "./Username.css";

export function Username({ community, username, user, source }) {
  const history = useHistory();

  const users = useSelector((state) => Object.values(state.users));
  const currentUser = useSelector((state) => state.session.user);

  let foundUser = users.filter((user) => user.username === username);

  const handleUsernameClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    history.push(`/users/${user.id}/profile`);
  };

  return (
    <div className="username-component-wrapper">
      <div className="username-component" onClick={handleUsernameClick}>
        {source === "singlepost" ? "u/" + username : username}
      </div>

      {foundUser.length > 0 &&
        currentUser &&
        currentUser.id !== foundUser[0].id && (
          <UsernamePopup community={community} user={foundUser} />
        )}
    </div>
  );
}
