import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { getUsers } from "../../store/users";

import "./CreatePostBar.css";

export default function CreatePostBar({ loadedCommunity }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const { communityId } = useParams();

  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
    console.log(user.profile_img);
  }, []);

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
        <input
          type="text"
          placeholder="Create Post"
          onClick={() => history.push(`/c/${communityId}/submit`)}
        />
      </div>
    </div>
  );
}
