import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getFollowers,
  getUserFollowers,
  addNotification,
} from "../store";

export function FollowBtn({ user }) {
  const dispatch = useDispatch();
  const follows = useSelector((state) => state.followers?.follows);

  const findIsFollowing = () =>
    follows
      ? Object.values(follows).some(
          (followed) => followed.username === user.username
        )
      : null;

  const [following, setFollowing] = useState(findIsFollowing());

  useEffect(() => {
    setFollowing(findIsFollowing());
  }, [follows, user.username]);

  const handleFollow = async (e) => {
    e.preventDefault();
    await dispatch(followUser(user.id));
    dispatch(getFollowers());
    dispatch(getUserFollowers(user.id));
    // After the follow action, the follow state is expected to be updated in your Redux store,
    // so there's no need to manually toggle the 'following' state here.
  };

  return (
    <button
      className={`username-popup-btn-btm ${
        !following ? "blue-btn-filled btn-long" : "blue-btn-unfilled btn-long"
      }`}
      onClick={handleFollow}
    >
      {!following ? "Follow" : "Unfollow"}
    </button>
  );
}
