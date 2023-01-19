import React from "react";
import { useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import "./CreatePostBar.css";

export default function CreatePostBar({ loadedCommunity }) {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  return (
    <div className="create-post-bar">
      {user && (
        <div className="create-post-bar-user-img">
          <NavLink to={`/users/${user.id}`}>
            <i className="fa-solid fa-circle-user"></i>
          </NavLink>
        </div>
      )}
      <div className="create-post-bar-create">
        <input
          type="text"
          placeholder="Create Post"
          onClick={() => history.push("/posts/submit")}
        />
      </div>
    </div>
  );
}
