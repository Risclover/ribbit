import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getUsers } from "../../store/users";

import "./CreatePostBar.css";

export default function CreatePostBar({ page, communityId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

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
            <img src={users[user.id]?.profile_img} />
          </NavLink>
        </div>
      )}
      <div className="create-post-bar-create">
        <input type="text" placeholder="Create Post" onClick={handleClick} />
      </div>
    </div>
  );
}
