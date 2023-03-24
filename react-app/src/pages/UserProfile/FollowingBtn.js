import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getFollowers,
  getUserFollowers,
} from "../../store/followers";

export default function FollowingBtn({ user, follows }) {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
  useEffect(() => {
    for (let followed of Object.values(follows)) {
      if (followed.username === user.username) {
        setFollowing(true);
      }
    }
  });

  const userFollowers = useSelector((state) => state.followers.userFollowers);

  const handleFollowing = async () => {
    setFollowing(!following);
    await dispatch(followUser(user.id));
    dispatch(getFollowers());
    dispatch(getUserFollowers(user.id));
  };
  return (
    <div className="user-profile-follower-right">
      {" "}
      <button
        className={
          !userFollowers[currentUser.id]
            ? "user-profile-follower-btn"
            : "user-profile-following-btn"
        }
        onClick={handleFollowing}
      >
        {!userFollowers[currentUser.id] ? "Follow" : "Following"}
      </button>
    </div>
  );
}
