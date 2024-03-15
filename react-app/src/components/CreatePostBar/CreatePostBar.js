import React from "react";
import { useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { RxImage } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import "./CreatePostBar.css";

export const CreatePostBar = ({ page, communityName }) => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const handleClick = (e) => {
    e.preventDefault();
    if (page === "community") {
      history.push(`/c/${communityName}/submit`);
    } else {
      history.push(`/submit`);
    }
  };

  const handleImageClick = () => {
    history.push(`/c/${communityName}/submit/image`);
  };

  const handleLinkClick = () => {
    history.push(`/c/${communityName}/submit/url`);
  };
  return (
    <div className="create-post-bar">
      {user && (
        <div className="create-post-bar-user-img">
          <NavLink to={`/users/${user.id}/profile`}>
            <img src={user.profile_img} alt="User" />
          </NavLink>
        </div>
      )}

      <div className="create-post-bar-create">
        <input type="text" placeholder="Create Post" onClick={handleClick} />
      </div>

      <button className="create-post-bar-icon" onClick={handleImageClick}>
        <RxImage />
      </button>

      <button className="create-post-bar-icon" onClick={handleLinkClick}>
        <FiLink />
      </button>
    </div>
  );
};
