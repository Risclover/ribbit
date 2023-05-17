import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getFollowers,
  getUserFollowers,
} from "../../store/followers";

export default function FollowingBtn({ user }) {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
  const follows = useSelector((state) => state.followers.follows);

  useEffect(() => {
    for (let followed of Object.values(follows)) {
      if (followed.username === user.username) {
        setFollowing(true);
        break;
      } else {
        setFollowing(false);
      }
    }
  }, []);

  const userFollowers = useSelector((state) => state.followers.userFollowers);

  const handleFollowing = async (e) => {
    e.preventDefault();
    await dispatch(followUser(user.id));
    dispatch(getFollowers());
    dispatch(getUserFollowers(user.id));
    setFollowing(!following);
  };

  return (
    <div className="user-profile-follower-right">
      {" "}
      <button
        className={
          !following
            ? "user-profile-follower-btn"
            : "user-profile-following-btn"
        }
        onClick={handleFollowing}
      >
        {!following ? "Follow" : "Following"}
      </button>
    </div>
  );
}
