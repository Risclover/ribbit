import React from "react";
import { useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { RxImage } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import "./CreatePostBar.css";

export default function CreatePostBar({ page, communityId }) {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  const users = useSelector((state) => state.users);

  const handleClick = (e) => {
    e.preventDefault();
    if (page === "community") {
      history.push(`/c/${communityId}/submit`);
    } else {
      history.push(`/c/submit`);
    }
  };

  return (
    <div className="create-post-bar">
      {user && (
        <div className="create-post-bar-user-img">
          <NavLink to={`/users/${user.id}/profile`}>
            <img src={users[user.id]?.profile_img} alt="User" />
          </NavLink>
        </div>
      )}
      <div className="create-post-bar-create">
        <input type="text" placeholder="Create Post" onClick={handleClick} />
      </div>
      <button
        className="create-post-bar-icon"
        onClick={() => history.push(`/c/${communityId}/submit/image`)}
      >
        <RxImage />
      </button>
      <button
        className="create-post-bar-icon"
        onClick={() => history.push(`/c/${communityId}/submit/url`)}
      >
        <FiLink />
      </button>
    </div>
  );
}
