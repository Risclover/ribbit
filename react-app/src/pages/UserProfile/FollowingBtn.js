import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getFollowers, getUserFollowers } from "../../store";

export function FollowingBtn({ user }) {
  const dispatch = useDispatch();
  const follows = useSelector((state) => state.followers.follows);

  const findIsFollowing = () =>
    Object.values(follows).some(
      (followed) => followed.username === user.username
    );

  const [following, setFollowing] = useState(findIsFollowing());

  useEffect(() => {
    setFollowing(findIsFollowing());
  }, [follows, user.username]);

  const handleFollowing = async (e) => {
    e.preventDefault();
    await dispatch(followUser(user.id));
    dispatch(getFollowers());
    dispatch(getUserFollowers(user.id));
    // After the follow action, the follow state is expected to be updated in your Redux store,
    // so there's no need to manually toggle the 'following' state here.
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
